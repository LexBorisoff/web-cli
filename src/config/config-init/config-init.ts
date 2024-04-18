import * as fs from "node:fs";
import * as path from "node:path";
import type { PackageJson } from "type-fest";
import { execa } from "execa";
import { getConfigArgs } from "../../command/args/get-config-args.js";
import {
  print,
  printError,
  printSuccess,
} from "../../helpers/print/print-severity.js";
import { getVersion } from "../../helpers/get-version.js";
import { fileContents } from "./file-contents.js";

const IS_DEV = true;
const { config } = getConfigArgs();

function readFile(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  try {
    return fs.readFileSync(filePath, { encoding: "utf-8" });
  } catch {
    return "";
  }
}

function parseData<T extends object = any>(data?: string | null): T {
  if (data == null || data === "") {
    return {} as T;
  }

  try {
    return JSON.parse(data) as T;
  } catch {
    return {} as T;
  }
}

async function createProjectDir(projectDir: string) {
  // TODO: handle if folder already exists
  fs.mkdirSync(projectDir);
  printSuccess("🎉 Created config directory");
}

const initialize = {
  async git() {
    await execa("git", ["init"]);
    printSuccess("🎉 Initialized git repository");
  },

  async npm() {
    await execa("npm", ["init", "-y"]);
    printSuccess("🎉 Initialized npm project");

    const configFile = path.resolve(process.cwd(), "package.json");
    const contents = readFile(configFile);
    const data = parseData<PackageJson>(contents);

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
    printSuccess("🎉 Installed dependencies");

    data.scripts = {
      config: "npm run config:engines && npm run config:browsers",
      "config:engines": "npx tsx ./config/engines.config",
      "config:browsers": "npx tsx ./config/browsers.config",
    };

    const space = 2;
    fs.writeFileSync(configFile, JSON.stringify(data, null, space));
    printSuccess("🎉 Updated package.json");
  },
};

async function createConfig(configFile: string, contents: string) {
  const filePath = path.resolve(process.cwd(), configFile);
  fs.writeFileSync(filePath, contents);
}

async function createConfigFiles() {
  createConfig(".eslintrc.cjs", fileContents.eslintrc);
  createConfig("tsconfig.json", fileContents.tsconfig);
  createConfig(".gitignore", fileContents.gitignore);
  printSuccess("🎉 Created config files");
}

async function createSrcFiles(projectDir: string) {
  const configDir = path.resolve(projectDir, "src");
  fs.mkdirSync(configDir);

  const configFiles = [
    { name: "engines", contents: fileContents.enginesConfig },
    { name: "browsers", contents: fileContents.browsersConfig },
  ].map((file) => ({ ...file, name: `src/${file.name}.ts` }));

  await Promise.all(
    configFiles.map(({ name, contents }) => {
      createConfig(name, contents);
    })
  );

  await execa("npx", ["prettier", "--write", "src/*.ts"]);
  printSuccess("🎉 Created src files");
}

export async function configInit() {
  if (config == null) {
    printError("Directory name must be provided!");
    print("web --config <project-name>");
    return;
  }

  const projectDir = path.resolve(process.cwd(), config);

  try {
    createProjectDir(projectDir);
    process.chdir(projectDir);

    await initialize.git();
    await initialize.npm();
    await createConfigFiles();
    await createSrcFiles(projectDir);

    // TODO: print instructions
  } catch (error) {
    console.log(error);
  }
}
