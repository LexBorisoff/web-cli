import { getConfigData } from "../../data/get-config-data.js";
import { printError } from "../../helpers/print/severity.js";
import {
  ConfigBrowser,
  ConfigEngine,
  CreateBrowserFn,
  CreateEngineFn,
  DefineConfigFn,
} from "../../types/config.types.js";
import { createConfigDir } from "./create-config-dir.js";
import { writeConfigFile } from "./write-config-file.js";

export const defineConfig: DefineConfigFn = function defineConfig(define) {
  try {
    createConfigDir();
  } catch {
    printError("Could not create config directory");
    return;
  }

  const engine: CreateEngineFn = (baseUrl, config = {}) => ({
    __engine: true,
    baseUrl,
    ...config,
  });

  const browser: CreateBrowserFn = (name, config = {}) => ({
    __browser: true,
    name,
    ...config,
  });

  const config = define({ engine, browser });

  const engines = Object.entries(config).reduce<Record<string, ConfigEngine>>(
    (result, [key, value]) => {
      if ("__engine" in value && value.__engine) {
        const { __engine, ...configEngine } = value;
        result[key] = configEngine;
      }

      return result;
    },
    {}
  );

  const browsers = Object.entries(config).reduce<Record<string, ConfigBrowser>>(
    (result, [key, value]) => {
      if ("__browser" in value && value.__browser) {
        const { __browser, ...configEngine } = value;
        result[key] = configEngine;
      }

      return result;
    },
    {}
  );

  const data = getConfigData();

  if (Object.keys(engines).length > 0) {
    data.engines = engines;
  }

  if (Object.keys(browsers).length > 0) {
    data.browsers = browsers;
  }

  writeConfigFile(data);
};
