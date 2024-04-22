import * as fs from "node:fs";
import { getConfigFilePath } from "../../helpers/config/get-config-path.js";
import type { ConfigFileData, DefineBrowsersFn } from "../types.js";
import { parseData } from "../utils/parse-data.js";
import { readFile } from "../utils/read-file.js";

export const defineBrowsers: DefineBrowsersFn = function defineBrowsers(
  define
) {
  const browsers = define((name, config = {}) => ({
    name,
    ...config,
  }));

  const configFile = getConfigFilePath();
  const contents = readFile(configFile);
  const data = parseData<ConfigFileData>(contents) ?? {};

  data.browsers = browsers;
  const space = 2;

  fs.writeFileSync(configFile, JSON.stringify(data, null, space));
};
