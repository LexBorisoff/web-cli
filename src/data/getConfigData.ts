import getSettingsData from "./getSettingsData";
import { configFileExists, readConfigFile } from "../helpers/config";
import { ConfigData } from "../types/config.types";

const settings = getSettingsData();

export default function getConfigData(): ConfigData {
  if (settings?.config != null) {
    return settings.config;
  }

  if (!configFileExists()) {
    return {};
  }

  const data = readConfigFile();

  try {
    return data != null && data !== "" ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}
