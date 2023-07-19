import { getConfigItem } from "../config";
import { getBrowserProfiles } from "../../data";
import { Profile } from "../../types/config.types";

export default function getProfile(
  profileNameOrAlias: string,
  browserName: string
): Profile | undefined {
  const browserProfiles = getBrowserProfiles(browserName);
  return getConfigItem(profileNameOrAlias, browserProfiles);
}
