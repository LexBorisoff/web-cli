import * as fs from "node:fs";
import { getConfigFilePath } from "../../helpers/config/get-config-path.js";
import type { DefineEnginesFn } from "../types.js";
import { getConfigData } from "../../data/get-config-data.js";

export const defineEngines: DefineEnginesFn = function defineEngines(callback) {
  const engines = callback((baseUrl, config = {}) => ({
    baseUrl,
    ...config,
  }));

  const configFile = getConfigFilePath();
  const data = getConfigData();

  data.engines = engines;
  const space = 2;

  fs.writeFileSync(configFile, JSON.stringify(data, null, space));
};
