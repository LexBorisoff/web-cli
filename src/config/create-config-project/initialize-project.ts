import * as fs from "node:fs";
import * as path from "node:path";
import { execa } from "execa";
import { PackageJson } from "type-fest";
import { getPackageJson } from "../../helpers/project/get-package-json.js";
import { readFile } from "../../helpers/utils/read-file.js";
import { parseData } from "../../helpers/utils/parse-data.js";
import { srcFiles } from "./create-project-files.js";

const isDev = process.env.IS_DEV === "true" || false;
const version = isDev ? "latest" : getPackageJson().version!;
const projectName = getPackageJson().name!;

export const initializeProject = {
  async git() {
    await execa("git", ["init"]);
  },

  async npm() {
    await execa("npm", ["init", "-y"]);

    const dependencies = [`${projectName}@${version}`];
    const devDependencies = [
      `typescript`,
      `eslint@"<9.0.0"`,
      `prettier`,
      `@typescript-eslint/eslint-plugin`,
      `@typescript-eslint/parser`,
      `eslint-config-prettier`,
      `eslint-import-resolver-typescript`,
      `eslint-plugin-import`,
      `eslint-plugin-prettier`,
    ];

    await execa("npm", ["install", ...dependencies]);
    await execa("npm", ["install", ...devDependencies, "--save-dev"]);

    const configFile = path.resolve(process.cwd(), "package.json");
    const contents = readFile(configFile);
    const data = parseData<PackageJson>(contents) ?? {};

    data.type = "module";
    data.scripts = {
      config: "npm run config:browsers && npm run config:engines",
      "config:browsers": `npx tsx ${srcFiles.browsers.fileName}`,
      "config:engines": `npx tsx ${srcFiles.engines.fileName}`,
    };

    const space = 2;
    fs.writeFileSync(configFile, JSON.stringify(data, null, space));
  },
};
