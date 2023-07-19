import getConfigData from "./getConfigData";
import { BrowsersConfig } from "../types/config.types";

export default function getBrowsersData(): BrowsersConfig {
  const config = getConfigData();
  return config.browsers ?? {};
}
