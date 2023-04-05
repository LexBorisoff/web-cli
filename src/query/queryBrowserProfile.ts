import queryUrl from "./queryUrl";
import { getArgs } from "../command";
import { getDefaultsData } from "../data";
import { getProfile } from "../helpers/browser";

const args = getArgs();

export async function hasProfile(browserName: string): Promise<boolean> {
  const defaults = await getDefaultsData();
  return args.profile != null || defaults.profile?.[browserName] != null;
}

export default async function queryBrowserProfile(
  browserName: string,
  url?: string
): Promise<void> {
  function openProfile(profileDirectory?: string) {
    queryUrl(browserName, url, profileDirectory);
  }

  const defaults = await getDefaultsData();

  // profile provided in args
  if (args.profile) {
    // one profile provided
    if (!Array.isArray(args.profile)) {
      const profile = await getProfile(args.profile, browserName);
      openProfile(profile?.directory);
    }
    // multiple profiles provided
    else {
      args.profile.forEach(async (profileFromArgs) => {
        const profile = await getProfile(profileFromArgs, browserName);
        openProfile(profile?.directory);
      });
    }
  }
  // profile provided in config defaults
  else if (defaults.profile?.[browserName] != null) {
    const profileName = defaults.profile[browserName];
    const profile = await getProfile(profileName, browserName);
    openProfile(profile?.directory);
  }
}
