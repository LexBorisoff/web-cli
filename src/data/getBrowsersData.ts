import getConfigData from "./getConfigData";
import { BrowsersData } from "../types/config.types";

export default function getBrowsersData(): BrowsersData {
  const config = getConfigData();
  return config.browsers ?? {};
}
