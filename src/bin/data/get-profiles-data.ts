import { getBrowsersData } from "./get-browsers-data.js";
import type { ProfilesData } from "../types/config.js";

export function getProfilesData(browserName: string): ProfilesData {
  const config = getBrowsersData();
  return config[browserName]?.profiles ?? {};
}
