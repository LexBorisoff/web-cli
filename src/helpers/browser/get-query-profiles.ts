import type { Profile } from "../../types/config.types.js";
import { defaultsData } from "../../data/defaults-data.js";
import { dataArgs } from "../../command/args/data-args.js";
import { findProfile } from "../find/find-profile.js";

function withProfile(browserName: string): boolean {
  return (
    dataArgs.profile(browserName).length > 0 ||
    defaultsData.profile(browserName) != null
  );
}

/**
 * Returns a list of tuples with profile's config key
 * and the Profile object for a provided browser name
 */
export function getQueryProfiles(browserName: string): [string, Profile][] {
  const profiles: [string, Profile][] = [];

  function handleProfile(profileNameOrAlias: string) {
    const found = findProfile(browserName, profileNameOrAlias);

    profiles.push(
      found != null
        ? found
        : [profileNameOrAlias, { directory: profileNameOrAlias }]
    );
  }

  if (withProfile(browserName)) {
    const profileArgs = dataArgs.profile(browserName);
    const defaultProfile = defaultsData.profile(browserName);

    if (profileArgs.length > 0) {
      profileArgs.forEach((profileNameOrAlias) => {
        handleProfile(profileNameOrAlias);
      });
    } else if (defaultProfile != null) {
      const [profileName] = defaultProfile;
      handleProfile(profileName);
    }
  }

  return profiles;
}
