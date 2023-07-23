import { getSettings, fileExists, readFile } from "../helpers/config";
import { ConfigData } from "../types/config.types";

const settings = getSettings();

export default function getConfigData(): ConfigData {
  if (settings?.config != null) {
    return settings.config;
  }

  if (!fileExists()) {
    return {};
  }

  const data = readFile();

  try {
    return data != null && data !== "" ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}
