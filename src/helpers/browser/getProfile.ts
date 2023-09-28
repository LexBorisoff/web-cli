import { getConfigItem } from "../config/index.js";
import { getProfilesData } from "../../data/index.js";
import type { Profile } from "../../types/config.d.ts";

/**
 * Returns a tuple with the profile's config key and the Profile object
 * if it can be found in the config by the browser name
 * and the profile's name or alias. Otherwise return undefined
 */
export default function getProfile(
  browserName: string,
  profileNameOrAlias: string
): [string, Profile] | undefined {
  const browserProfiles = getProfilesData(browserName);
  return getConfigItem(profileNameOrAlias, browserProfiles);
}
