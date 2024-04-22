import * as fs from "node:fs";
import * as path from "node:path";
import { execa } from "execa";
import { PackageJson } from "type-fest";
import { getVersion } from "../../helpers/get-version.js";
import { readFile } from "../utils/read-file.js";
import { parseData } from "../utils/parse-data.js";
import { SRC_FILES } from "./create-project-files.js";

const isDev = process.env.IS_DEV === "true" || false;

export class InitializeProject {
  static async git() {
    await execa("git", ["init"]);
  }

  static async npm() {
    await execa("npm", ["init", "-y"]);

    const latest = "latest";
    const version = isDev ? latest : getVersion() ?? latest;

    const dependencies = [`@lexjs/web-cli@${version} `];
    const devDependencies = [
      "eslint",
      "typescript",
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
      "prettier",
    ];

    await execa("npm", ["install", ...dependencies]);
    await execa("npm", ["install", ...devDependencies, "--save-dev"]);

    const configFile = path.resolve(process.cwd(), "package.json");
    const contents = readFile(configFile);
    const data = parseData<PackageJson>(contents) ?? {};

    data.scripts = {
      config: "npm run config:browsers && npm run config:engines",
      "config:browsers": `npx tsx ${SRC_FILES.browsers.fileName}`,
      "config:engines": `npx tsx ${SRC_FILES.engines.fileName}`,
    };

    const space = 2;
    fs.writeFileSync(configFile, JSON.stringify(data, null, space));
  }
}
