import getConfigData from "./getConfigData";
import { ConfigValue } from "../command/options";
import type { BrowsersData } from "../types/config";

export default function getBrowsersData(): BrowsersData {
  return getConfigData(ConfigValue.Browsers);
}
