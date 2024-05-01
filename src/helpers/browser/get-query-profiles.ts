import type { Profile } from "../../types/config.types.js";
import { getDefaultsData } from "../../data/get-defaults-data.js";
import { getDataArgs } from "../../command/args/get-data-args.js";
import { withProfile } from "../../command/with.js";
import { findProfile } from "../find/find-profile.js";

const defaults = getDefaultsData();

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
    const profileArgs = getDataArgs.profile(browserName);
    const defaultProfile = defaults.profile(browserName);

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
