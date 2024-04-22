import type { ConfigFileData } from "../types/config.types.js";
import { getConfigData } from "./get-config-data.js";

export function getBrowsersData(): NonNullable<ConfigFileData["browsers"]> {
  return getConfigData().browsers ?? {};
}
