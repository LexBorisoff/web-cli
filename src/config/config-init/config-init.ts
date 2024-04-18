import * as fs from "node:fs";
import * as path from "node:path";
import type { PackageJson } from "type-fest";
import { execa } from "execa";
import { getConfigArgs } from "../../command/args/get-config-args.js";
import { print, printError } from "../../helpers/print/print-severity.js";
import { fileContents } from "./file-contents.js";

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
  fs.mkdirSync(projectDir);
  process.chdir(projectDir);
}

const initialize = {
  async git() {
    await execa("git", ["init"]);
  },

  async npm() {
    await execa("npm", ["init", "-y"]);

    const configFile = path.resolve(process.cwd(), "package.json");
    const contents = readFile(configFile);
    const data = parseData<PackageJson>(contents);

    const dependencies = [
      "eslint",
      "typescript",
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
      "prettier",
    ];

    await execa("npm", ["install", ...dependencies, "--save-dev"]);
    await execa("npm", ["install", "@lexjs/web-cli"]);

    data.scripts = {
      config: "npm run config:engines && npm run config:browsers",
      "config:engines": "npx tsx ./config/engines.config",
      "config:browsers": "npx tsx ./config/browsers.config",
    };

    const space = 2;
    fs.writeFileSync(configFile, JSON.stringify(data, null, space));
  },
};

async function createConfig(configFile: string, contents: string) {
  const filePath = path.resolve(process.cwd(), configFile);
  fs.writeFileSync(filePath, contents);
}

async function createConfigFiles(projectDir: string) {
  const configDir = path.resolve(projectDir, "config");
  fs.mkdirSync(configDir);

  const configFiles = [
    { name: "engines", contents: fileContents.enginesConfig },
    { name: "browsers", contents: fileContents.browsersConfig },
  ].map((file) => ({ ...file, name: `config/${file.name}.config.ts` }));

  await Promise.all(
    configFiles.map(({ name, contents }) => {
      createConfig(name, contents);
    })
  );

  await execa("npx", ["prettier", "--write", "config/*.ts"]);
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

    await initialize.npm();
    await initialize.git();

    createConfig(".eslintrc.cjs", fileContents.eslintrc);
    createConfig("tsconfig.json", fileContents.tsconfig);
    createConfig(".gitignore", fileContents.gitignore);

    await createConfigFiles(projectDir);
  } catch (error) {
    console.log(error);
  }
}
