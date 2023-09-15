import getBrowsersData from "./getBrowsersData";
import type { ProfilesData } from "../types/config";

export default function getProfilesData(browserName: string): ProfilesData {
  const config = getBrowsersData();
  return config[browserName]?.profiles ?? {};
}
