import { findConfigItem } from "../config/index.js";
import { getProfilesData } from "../../data/index.js";
import type { Profile } from "../../types/config.js";

/**
 * Returns a tuple with the profile's config key and the Profile object
 * if it can be found in the config by the browser name
 * and the profile's name or alias. Otherwise returns undefined
 */
export default function findProfile(
  browserName: string,
  profileNameOrAlias: string
): [string, Profile] | undefined {
  const browserProfiles = getProfilesData(browserName);
  return findConfigItem(profileNameOrAlias, browserProfiles);
}
