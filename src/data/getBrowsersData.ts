import getConfigData from "./getConfigData";
import { ConfigValue } from "../command/options";
import { BrowsersData } from "../types/config.types";

export default function getBrowsersData(): BrowsersData {
  return getConfigData(ConfigValue.Browsers);
}
