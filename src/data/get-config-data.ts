import { ConfigValue } from "../command/options.js";
import { readConfigFile } from "../helpers/config/read-config-file.js";
import type { BrowsersData, EnginesData } from "../types/config.js";

interface Data {
  [ConfigValue.Browsers]: BrowsersData;
  [ConfigValue.Engines]: EnginesData;
}

export function getConfigData<ConfigType extends keyof Data>(
  configType: ConfigType
): Data[ConfigType] {
  const config = readConfigFile(configType);
  if (config == null || config === "") {
    return {};
  }

  try {
    return JSON.parse(config);
  } catch {
    return {};
  }
}
