import { ConfigValue } from "../command/options";
import { readConfigFile } from "../helpers/config";
import { BrowsersData, EnginesData } from "../types/config.types";

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
