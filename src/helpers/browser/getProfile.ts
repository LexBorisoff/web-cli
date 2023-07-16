import { getConfigItem } from "../config";
import { getProfilesData } from "../../data";
import { Profile } from "../../types/config.types";

export default function getProfile(
  profileNameOrAlias: string,
  browserName: string
): Profile | undefined {
  const profiles = getProfilesData();
  const browserProfiles = profiles[browserName];
  return browserProfiles != null
    ? getConfigItem(profileNameOrAlias, browserProfiles)
    : undefined;
}
