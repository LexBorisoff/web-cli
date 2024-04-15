import { getConfigData } from "./get-config-data.js";
import { ConfigValue } from "../command/options.js";
import type { BrowsersData } from "../types/config.js";

export function getBrowsersData(): BrowsersData {
  return getConfigData(ConfigValue.Browsers);
}

export const lex = "lex";
