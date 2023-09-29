import getBrowsersData from "./getBrowsersData.js";
import type { ProfilesData } from "../types/config.d.ts";

export default function getProfilesData(browserName: string): ProfilesData {
  const config = getBrowsersData();
  return config[browserName]?.profiles ?? {};
}
