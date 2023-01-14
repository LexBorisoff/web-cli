import queryUrl from "./queryUrl";
import { getArgs } from "../command";
import { getProfile } from "../helpers";
import { defaults } from "../data";

const args = getArgs();

export default async function queryBrowserProfile(
  browser: string,
  url?: string
) {
  function openProfile(profile?: string) {
    queryUrl(browser, url, profile);
  }

  // profile provided in args
  if (args.profile) {
    // one profile provided
    if (!Array.isArray(args.profile)) {
      const profile = getProfile(args.profile, browser);
      openProfile(profile);
    }
    // multiple profiles provided
    else {
      args.profile.forEach(async (profileName) => {
        const profile = getProfile(profileName, browser);
        openProfile(profile);
      });
    }
  }
  // profile provided in config defaults
  else if (defaults.profile != null && defaults.profile[browser]) {
    const defaultProfile = defaults.profile[browser];
    const profile = getProfile(defaultProfile, browser);
    openProfile(profile);
  }
}
