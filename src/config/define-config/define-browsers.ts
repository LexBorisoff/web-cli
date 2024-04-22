import * as fs from "node:fs";
import type { DefineBrowsersFn } from "../types.js";
import { getConfigData } from "../../data/get-config-data.js";
import { getConfigFilePath } from "../../helpers/config/get-config-path.js";

export const defineBrowsers: DefineBrowsersFn = function defineBrowsers(
  define
) {
  const browsers = define((name, config = {}) => ({
    name,
    ...config,
  }));

  const configFile = getConfigFilePath();
  const data = getConfigData();

  data.browsers = browsers;
  const space = 2;

  fs.writeFileSync(configFile, JSON.stringify(data, null, space));
};
