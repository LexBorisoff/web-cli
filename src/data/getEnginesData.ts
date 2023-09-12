import getConfigData from "./getConfigData";
import { ConfigValue } from "../command/options";
import { EnginesData } from "../types/config.types";
import { initialEngines } from "../helpers/config";

export default function getEnginesData(): EnginesData {
  const configData = getConfigData(ConfigValue.Engines);
  return Object.keys(configData).length > 0 ? configData : initialEngines;
}
