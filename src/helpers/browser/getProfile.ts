import { getConfigItem } from "../config";
import { getProfilesData } from "../../data";
import { Profile } from "../../types/config.types";

export default function getProfile(
  profileNameOrAlias: string,
  browserName: string
): Profile | undefined {
  const browserProfiles = getProfilesData(browserName);
  return getConfigItem(profileNameOrAlias, browserProfiles);
}
