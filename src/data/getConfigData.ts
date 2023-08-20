import { ConfigOption } from "../command/options";
import { readConfigFile } from "../helpers/config";
import { BrowsersData, EnginesData } from "../types/config.types";

interface Data {
  [ConfigOption.Browsers]: BrowsersData;
  [ConfigOption.Engines]: EnginesData;
}

type ValidOption = ConfigOption.Browsers | ConfigOption.Engines;

export default function getConfigData<Option extends ValidOption>(
  configOption: Option
): Data[Option] {
  const config = readConfigFile(configOption);
  if (config == null || config === "") {
    return {};
  }

  try {
    return JSON.parse(config);
  } catch {
    return {};
  }
}
