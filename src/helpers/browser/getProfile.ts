import { getConfigItem } from "../config";
import { getProfilesData } from "../../data";
import { Profile } from "../../types/data.types";

export default async function getProfile(
  profileNameOrAlias: string,
  browserName: string
): Promise<Profile | undefined> {
  const profiles = await getProfilesData();
  const browserProfiles = profiles[browserName];
  return browserProfiles != null
    ? getConfigItem(profileNameOrAlias, browserProfiles)
    : undefined;
}
