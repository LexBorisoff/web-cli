import { getConfigItemByNameOrAlias } from "./utils";
import { profiles } from "../data";
import { Profile } from "../types";

export default function getProfile(
  profileNameOrAlias: string,
  browserName: string
): Profile | undefined {
  const browserProfiles = profiles?.[browserName];
  return browserProfiles
    ? getConfigItemByNameOrAlias(profileNameOrAlias, browserProfiles)
    : undefined;
}
