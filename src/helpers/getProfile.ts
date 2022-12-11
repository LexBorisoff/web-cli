import { getConfigItemByNameOrAlias } from "./utils";
import { profiles } from "../data";

export default function getProfile(
  profileName: string,
  browserName: string
): string | undefined {
  const browserProfiles = profiles[browserName];
  if (browserProfiles) {
    return getConfigItemByNameOrAlias(profileName, browserProfiles)?.profile;
  }
}
