import * as fs from "node:fs";
import { getConfigData } from "../../data/get-config-data.js";
import { getConfigDirPath } from "../../helpers/config/get-config-path.js";
import { logger } from "../../helpers/utils/logger.js";
import {
  ConfigDataDto,
  ConfigMetaDto,
  ConfigDataJson,
  ConfigMetaJson,
  ConfigBrowser,
  ConfigEngine,
  CreateEngineFn,
  CreateBrowserFn,
  ClearEnginesFn,
  ClearBrowsersFn,
  DefineConfigFn,
} from "../../types/config.types.js";
import { writeConfigFile } from "../write-config-file.js";
import { isValidDateString } from "../../helpers/utils/is-valid-date-string.js";
import { OmitKey } from "../../types/omit-key.type.js";

function getConfigMetaDto(meta: ConfigMetaJson = {}): ConfigMetaDto {
  const { projectDir, createdAt, updatedAt } = meta;
  return {
    projectDir,
    createdAt:
      createdAt != null && isValidDateString(createdAt)
        ? new Date(createdAt)
        : undefined,
    updatedAt:
      updatedAt != null && isValidDateString(updatedAt)
        ? new Date(updatedAt)
        : undefined,
  };
}

function updateMeta(): ConfigMetaDto {
  const configData = getConfigData();
  const date = new Date();
  const meta = getConfigMetaDto(configData.meta);

  meta.projectDir = process.cwd();
  meta.updatedAt = date;
  if (meta.createdAt == null) {
    meta.createdAt = date;
  }

  return meta;
}

interface ClearConfigProps {
  clear?: {
    engines?: boolean;
    browsers?: boolean;
  };
}
type UpdateConfigProps<Data extends ConfigDataDto | ConfigDataJson> = Partial<
  OmitKey<Data, "meta">
> &
  ClearConfigProps;

function updateConfig<Data extends ConfigDataDto>({
  engines,
  browsers,
  clear,
}: UpdateConfigProps<Data>) {
  const config = getConfigData();

  try {
    const updated = {
      engines: {
        ...(clear?.engines ? {} : { ...config.engines, ...engines }),
      },
      browsers: {
        ...(clear?.browsers ? {} : { ...config.browsers, ...browsers }),
      },
      meta: updateMeta(),
    };

    writeConfigFile(updated);
  } catch {
    logger.error("Could not write to config file");
  }
}

const engine: CreateEngineFn = (baseUrl, config = {}) => ({
  __engine: true,
  baseUrl,
  ...config,
});

const browser: CreateBrowserFn = (config = {}) => ({
  __browser: true,
  ...config,
});

export const defineConfig: DefineConfigFn = function defineConfig(define) {
  const configDir = getConfigDirPath();
  if (!fs.existsSync(configDir)) {
    try {
      fs.mkdirSync(configDir);
    } catch {
      logger.error("Could not create config directory");
      return;
    }
  }

  const definedConfig = define({ engine, browser });

  const engines = Object.entries(definedConfig).reduce<
    Record<string, ConfigEngine>
  >((result, [key, value]) => {
    if ("__engine" in value && value.__engine) {
      const { __engine, ...configEngine } = value;
      result[key] = configEngine;
    }

    return result;
  }, {});

  const browsers = Object.entries(definedConfig).reduce<
    Record<string, ConfigBrowser>
  >((result, [key, value]) => {
    if ("__browser" in value && value.__browser) {
      const { __browser, ...configEngine } = value;
      result[key] = configEngine;
    }

    return result;
  }, {});

  if (Object.keys(engines).length > 0) {
    updateConfig({ engines });
  }

  if (Object.keys(browsers).length > 0) {
    updateConfig({ browsers });
  }
};

export const clearEngines: ClearEnginesFn = function clearEngines() {
  updateConfig({ clear: { engines: true } });
};

export const clearBrowsers: ClearBrowsersFn = function clearBrowsers() {
  updateConfig({ clear: { browsers: true } });
};
