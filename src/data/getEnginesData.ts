import getConfigData from "./getConfigData";
import { ConfigOption } from "../command/options";
import { EnginesData } from "../types/config.types";

export default function getEnginesData(): EnginesData {
  return getConfigData(ConfigOption.Engines);
}
