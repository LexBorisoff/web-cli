import type { ConfigDataJson } from "../types/config.types.js";
import { getConfigData } from "./get-config-data.js";

export function getBrowsersData(): NonNullable<ConfigDataJson["browsers"]> {
  return getConfigData().browsers ?? {};
}
