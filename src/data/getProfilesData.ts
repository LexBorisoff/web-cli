import getConfigData from "./getConfigData";
import { ProfilesData } from "../types/config.types";

export default function getProfilesData(browserName: string): ProfilesData {
  const config = getConfigData();
  return config.browsers?.[browserName]?.profiles ?? {};
}
