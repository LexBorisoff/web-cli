import { getConfigItemByNameOrAlias } from "../utils";
import { getProfilesData } from "../../data";
import { Profile } from "../../types/data.types";

export default async function getProfile(
  profileNameOrAlias: string,
  browserName: string
): Promise<Profile | undefined> {
  const profiles = await getProfilesData();
  const browserProfiles = profiles?.[browserName];
  return Object.keys(browserProfiles).length > 0
    ? getConfigItemByNameOrAlias(profileNameOrAlias, browserProfiles)
    : undefined;
}
