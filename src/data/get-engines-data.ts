import { ConfigValue } from "../command/options.js";
import { initialEngines } from "../helpers/config/index.js";
import type { EnginesData } from "../types/config.js";
import { getConfigData } from "./get-config-data.js";

export function getEnginesData(): EnginesData {
  const configData = getConfigData(ConfigValue.Engines);
  return Object.keys(configData).length > 0 ? configData : initialEngines;
}
