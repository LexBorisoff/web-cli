import * as fs from "node:fs";
import { getConfigFilePath } from "../../helpers/config/get-config-path.js";
import type { ConfigFileData, DefineEnginesFn } from "../types.js";
import { parseData } from "../utils/parse-data.js";
import { readFile } from "../utils/read-file.js";

export const defineEngines: DefineEnginesFn = function defineEngines(callback) {
  const engines = callback((baseUrl, config = {}) => ({
    baseUrl,
    ...config,
  }));

  const configFile = getConfigFilePath();
  const contents = readFile(configFile);
  const data = parseData<ConfigFileData>(contents) ?? {};

  data.engines = engines;
  const space = 2;

  fs.writeFileSync(configFile, JSON.stringify(data, null, space));
};
