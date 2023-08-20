import getConfigData from "./getConfigData";
import { ConfigOption } from "../command/options";
import { BrowsersData } from "../types/config.types";

export default function getBrowsersData(): BrowsersData {
  return getConfigData(ConfigOption.Browsers);
}
