import { ConfigValue } from "../command/options.js";
import type { BrowsersData } from "../types/config.js";
import { getConfigData } from "./get-config-data.js";

export function getBrowsersData(): BrowsersData {
  return getConfigData(ConfigValue.Browsers);
}
