import { ConfigValue } from "../command/options.js";
import { readConfigFile } from "../helpers/config/index.js";
import type { BrowsersData, EnginesData } from "../types/config.d.ts";

interface Data {
  [ConfigValue.Browsers]: BrowsersData;
  [ConfigValue.Engines]: EnginesData;
}

export default function getConfigData<ConfigType extends keyof Data>(
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
