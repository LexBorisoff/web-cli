import getBrowsersData from "./getBrowsersData";
import { ProfilesData } from "../types/config.types";

export default function getProfilesData(browserName: string): ProfilesData {
  const config = getBrowsersData();
  return config[browserName]?.profiles ?? {};
}
