import getConfigData from "./getConfigData";
import { ConfigValue } from "../command/options";
import type { EnginesData } from "../types/config";
import { initialEngines } from "../helpers/config";

export default function getEnginesData(): EnginesData {
  const configData = getConfigData(ConfigValue.Engines);
  return Object.keys(configData).length > 0 ? configData : initialEngines;
}
