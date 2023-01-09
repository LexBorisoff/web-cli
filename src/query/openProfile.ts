import openUrl from "./openUrl";
import { getArgs } from "../command";
import { getProfile } from "../helpers";
import { defaults } from "../data";

const args = getArgs();

async function openProfileUrl(
  browserName: string,
  profile?: string,
  url?: string
) {
  await openUrl(url, browserName, profile);
}

export default async function openProfile(browserName: string, url?: string) {
  // profile provided in args
  if (args.profile) {
    // one profile provided
    if (!Array.isArray(args.profile)) {
      const profile = getProfile(args.profile, browserName);
      openProfileUrl(browserName, profile, url);
    }
    // multiple profiles provided
    else {
      args.profile.forEach(async (profileFromArgs) => {
        const profile = getProfile(profileFromArgs, browserName);
        openProfileUrl(browserName, profile, url);
      });
    }
  }
  // profile provided in config defaults
  else if (defaults.profile) {
    const defaultProfile = defaults.profile[browserName];
    const profile = getProfile(defaultProfile, browserName);
    openProfileUrl(browserName, profile, url);
  }
}
