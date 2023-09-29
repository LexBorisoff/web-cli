import getConfigData from "./getConfigData.js";
import { ConfigValue } from "../command/options.js";
import type { BrowsersData } from "../types/config.d.ts";

export default function getBrowsersData(): BrowsersData {
  return getConfigData(ConfigValue.Browsers);
}
