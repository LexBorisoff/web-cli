import { profiles } from "../data";
import { getConfigItemByNameOrAlias } from "../helpers";

export default function getProfile(
  profileName: string,
  browserName: string
): string | undefined {
  const browserProfiles = profiles[browserName];
  if (browserProfiles) {
    return getConfigItemByNameOrAlias(profileName, browserProfiles)?.profile;
  }
}
