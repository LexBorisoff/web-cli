import getSettingsData from "./getSettingsData";
import { configFileExists, readConfigFile } from "../helpers/config";
import { ConfigData } from "../types/config.types";

const settings = getSettingsData();

export default function getConfigData(): ConfigData {
  if (settings?.config != null) {
    return settings.config;
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
