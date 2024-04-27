import * as fs from "node:fs";
import * as path from "node:path";
import { execa } from "execa";
import { PackageJson } from "type-fest";
import { getPackageJson } from "../../helpers/project/get-package-json.js";
import { readFile } from "../../helpers/utils/read-file.js";
import { parseData } from "../../helpers/utils/parse-data.js";
import { srcFiles } from "./create-project-files.js";

const isDev = process.env.NODE_ENV === "development" || false;
const version = getPackageJson().version!;
const projectName = getPackageJson().name!;

export const initializeProject = {
  async git() {
    await execa("git", ["init"]);
  },

  async npm() {
    await execa("npm", ["init", "-y"]);

    const thisProject = `${projectName}@${version}`;
    const dependencies = [thisProject];

    const devDependencies = [
      `typescript`,
      `eslint@8`,
      `prettier`,
      `@typescript-eslint/eslint-plugin`,
      `@typescript-eslint/parser`,
      `eslint-config-prettier`,
      `eslint-import-resolver-typescript`,
      `eslint-plugin-import`,
      `eslint-plugin-prettier`,
    ];

    // do not install this project when in dev environment
    await execa("npm", [
      "install",
      ...dependencies.filter(
        (dependency) => !isDev || dependency !== thisProject
      ),
    ]);

    await execa("npm", ["install", "--save-dev", ...devDependencies]);

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
