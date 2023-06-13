import queryUrl from "./queryUrl";
import { getArgs } from "../command";
import { getDefaultsData } from "../data";
import { getProfile } from "../helpers/browser";

const args = getArgs();

export function hasProfile(browserName: string): boolean {
  const defaults = getDefaultsData();
  return args.profile != null || defaults.profile?.[browserName] != null;
}

export default async function queryBrowserProfile(
  browserName: string,
  url?: string
): Promise<void> {
  async function openProfile(profileDirectory?: string) {
    await queryUrl(browserName, url, profileDirectory);
  }

  const defaults = getDefaultsData();

  // profile provided in args
  if (args.profile) {
    // one profile provided
    if (!Array.isArray(args.profile)) {
      const profile = getProfile(args.profile.toLowerCase(), browserName);
      await openProfile(profile?.directory);
    }
    // multiple profiles provided
    else {
      args.profile.forEach(async (profileFromArgs) => {
        const profile = getProfile(profileFromArgs.toLowerCase(), browserName);
        await openProfile(profile?.directory);
      });
    }
  }
  // profile provided in config defaults
  else if (defaults.profile?.[browserName] != null) {
    const profileName = defaults.profile[browserName];
    const profile = getProfile(profileName, browserName);
    await openProfile(profile?.directory);
  }
}
