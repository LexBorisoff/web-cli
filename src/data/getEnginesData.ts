import getConfigData from "./getConfigData.js";
import { ConfigValue } from "../command/options.js";
import type { EnginesData } from "../types/config.d.ts";
import { initialEngines } from "../helpers/config/index.js";

export default function getEnginesData(): EnginesData {
  const configData = getConfigData(ConfigValue.Engines);
  return Object.keys(configData).length > 0 ? configData : initialEngines;
}
