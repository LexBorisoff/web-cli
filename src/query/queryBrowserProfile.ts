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
      const profileName = getProfile(args.profile, browserName);
      openProfile(profileName?.directory);
    }
    // multiple profiles provided
    else {
      args.profile.forEach(async (profileFromArgs) => {
        const profileName = getProfile(profileFromArgs, browserName);
        openProfile(profileName?.directory);
      });
    }
  }
  // profile provided in config defaults
  else if (defaults.profile?.[browserName] != null) {
    const profile = defaults.profile[browserName];
    openProfile(profile);
  }
}
