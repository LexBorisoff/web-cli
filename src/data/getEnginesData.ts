import getConfigData from "./getConfigData";
import { ConfigValue } from "../command/options";
import { EnginesData } from "../types/config.types";

export default function getEnginesData(): EnginesData {
  return getConfigData(ConfigValue.Engines);
}
