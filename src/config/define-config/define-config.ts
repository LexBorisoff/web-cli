import * as fs from "node:fs";
import { getConfigData } from "../../data/get-config-data.js";
import { getConfigDirPath } from "../../helpers/config/get-config-path.js";
import { printError } from "../../helpers/print/severity.js";
import {
  ConfigBrowser,
  ConfigEngine,
  CreateBrowserFn,
  CreateEngineFn,
  DefineConfigFn,
} from "../../types/config.types.js";
import { writeConfigFile } from "./write-config-file.js";

export const defineConfig: DefineConfigFn = function defineConfig(define) {
  const configDir = getConfigDirPath();
  const data = getConfigData();
  const meta = data.meta ?? {};

  if (!fs.existsSync(configDir)) {
    try {
      fs.mkdirSync(configDir);
      meta.createdAt = new Date();
    } catch {
      printError("Could not create config directory");
      return;
    }
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

  meta.updatedAt = new Date();
  meta.projectDir = process.cwd();

  if (Object.keys(engines).length > 0) {
    data.engines = engines;
  }

  if (Object.keys(browsers).length > 0) {
    data.browsers = browsers;
  }

  writeConfigFile(data);
};
