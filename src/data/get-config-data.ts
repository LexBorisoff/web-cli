import type { ConfigFileData } from "../types/config.types.js";
import { readConfigFile } from "../helpers/config/read-config-file.js";

export function getConfigData(): ConfigFileData {
  const config = readConfigFile();
  if (config == null || config === "") {
    return {};
  }

  try {
    return JSON.parse(config);
  } catch {
    return {};
  }
}
