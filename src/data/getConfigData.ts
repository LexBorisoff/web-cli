import {
  getSettings,
  configFileExists,
  readConfigFile,
} from "../helpers/config";
import { ConfigData } from "../types/config.types";

const configCache = getSettings()?.config;

export default function getConfigData(): ConfigData {
  if (configCache != null) {
    return configCache;
  }

  const data = readConfigFile();
  if (!configFileExists() || data == null || data === "") {
    return {};
  }

  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
}
