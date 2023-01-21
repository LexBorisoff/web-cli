import queryUrl from "./queryUrl";
import { getArgs } from "../command";
import { getProfile } from "../helpers";
import { defaults } from "../data";

const args = getArgs();

export function hasProfile(browserName: string): boolean {
  return args.profile != null || defaults.profile?.[browserName] != null;
}

export default async function queryBrowserProfile(
  browserName: string,
  url?: string
) {
  function openProfile(profileDirectory?: string) {
    queryUrl(browserName, url, profileDirectory);
  }

  // profile provided in args
  if (args.profile) {
    // one profile provided
    if (!Array.isArray(args.profile)) {
      const profile = getProfile(args.profile, browserName);
      openProfile(profile?.directory);
    }
    // multiple profiles provided
    else {
      args.profile.forEach(async (profileFromArgs) => {
        const profile = getProfile(profileFromArgs, browserName);
        openProfile(profile?.directory);
      });
    }
  }
  // profile provided in config defaults
  else if (defaults.profile?.[browserName] != null) {
    const profileName = defaults.profile[browserName];
    const profile = getProfile(profileName, browserName);
    openProfile(profile?.directory);
  }
}
