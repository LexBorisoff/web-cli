import { stdout } from "process";
import * as fs from "node:fs";
import * as path from "node:path";

import chalk from "chalk";
import { execa } from "execa";
import { PackageJson } from "type-fest";
import {
  print,
  printSuccess,
  severity,
} from "../../helpers/print/print-severity.js";
import { getVersion } from "../../helpers/get-version.js";
import { fileContents } from "../file-contents.js";
import { readFile } from "../utils/read-file.js";
import { parseData } from "../utils/parse-data.js";
import { promptText } from "../prompts.js";
import { loading } from "../utils/loading.js";

const IS_DEV = true;

async function createProjectDir(projectDir: string) {
  // TODO: handle if folder already exists
  fs.mkdirSync(projectDir);
}

const initialize = {
  async git() {
    await execa("git", ["init"]);
  },

  async npm() {
    await execa("npm", ["init", "-y"]);

    const configFile = path.resolve(process.cwd(), "package.json");
    const contents = readFile(configFile);
    const data = parseData<PackageJson>(contents) ?? {};

    const version = getVersion();
    const dependencies = [
      `@lexjs/web-cli@${version != null && !IS_DEV ? version : "latest"} `,
    ];
    const devDependencies = [
      "eslint",
      "typescript",
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
      "prettier",
    ];

    await execa("npm", ["install", ...dependencies]);
    await execa("npm", ["install", ...devDependencies, "--save-dev"]);

    data.scripts = {
      config: "npm run config:engines && npm run config:browsers",
      "config:engines": "npx tsx ./config/engines.config",
      "config:browsers": "npx tsx ./config/browsers.config",
    };

    const space = 2;
    fs.writeFileSync(configFile, JSON.stringify(data, null, space));
  },
};

async function createConfigFile(
  contents: string,
  { projectName, fileName }: { projectName: string; fileName: string }
): Promise<void> {
  const filePath = path.resolve(process.cwd(), fileName);
  fs.writeFileSync(filePath, contents);
  print(severity.success("CREATE"), `${projectName}/${fileName}`);
}

async function createProjectConfigFiles(projectName: string) {
  const files = [
    { fileName: ".eslintrc.cjs", contents: fileContents.eslintrc },
    { fileName: "tsconfig.json", contents: fileContents.tsconfig },
    { fileName: ".gitignore", contents: fileContents.gitignore },
  ];

  await Promise.all(
    files.map(({ fileName, contents }) =>
      createConfigFile(contents, { fileName, projectName })
    )
  );
}

async function createSrcFiles(projectDir: string, projectName: string) {
  const configDir = path.resolve(projectDir, "src");
  fs.mkdirSync(configDir);

  const files = [
    { name: "engines", contents: fileContents.enginesConfig },
    { name: "browsers", contents: fileContents.browsersConfig },
  ].map(({ name, contents }) => ({ fileName: `src/${name}.ts`, contents }));

  await Promise.all(
    files.map(({ fileName, contents }) =>
      createConfigFile(contents, { fileName, projectName })
    )
  );

  await execa("npx", ["prettier", "--write", "src/*.ts"]);
}

function printSuccessfulInit(projectName: string) {
  print(`🚀 Successfully created ${severity.success(projectName)}\n`);

  const left = "  ";

  print(left + `${severity.warning("1.")} Proceed to the project`);
  print(left + chalk.gray(`$ cd ${projectName}`));
  print();
  print(
    left +
      `${severity.warning("2.")} Edit ${severity.info("engines.ts")} and ${severity.info("browsers.ts")}`
  );
  print();
  print(left + `${severity.warning("3.")} Generate config file`);
  print(left + chalk.gray(`$ npm run config`));
  print();
  print(
    left +
      `${severity.warning("4.")} Enjoy using the ${severity.info("web")} command 😎`
  );
}

export async function createConfig() {
  const { projectName } = await promptText({
    name: "projectName",
    message: "Project name",
    initial: "web-cli-config",
  });

  if (projectName == null) {
    return;
  }

  const projectDir = path.resolve(process.cwd(), projectName);

  try {
    print(`\n⚡ Scaffolding ${severity.info(projectName)} ...\n`);

    createProjectDir(projectDir);
    process.chdir(projectDir);

    await initialize.git();

    await createProjectConfigFiles(projectName);
    await createSrcFiles(projectDir, projectName);

    print();
    await loading(initialize.npm, {
      message: severity.info("Installing dependencies"),
    });
    printSuccessfulInit(projectName);

    // TODO: print instructions
  } catch (error) {
    console.log(error);
  }
}
