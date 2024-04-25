import type { ConfigData } from "../types/config.types.js";
import { getConfigData } from "./get-config-data.js";

export function getBrowsersData(): NonNullable<ConfigData["browsers"]> {
  return getConfigData().browsers ?? {};
}
