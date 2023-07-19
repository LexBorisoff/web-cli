import openBrowser from "./openBrowser";
import { getArgs } from "../command";
import { getDefaultsData } from "../data";
import { getProfile } from "../helpers/browser";

const args = getArgs();

export function hasProfile(browserName: string): boolean {
  const defaults = getDefaultsData();
  return args.profile != null || defaults.profile?.[browserName] != null;
}

export default async function queryProfile(
  browserName: string,
  url?: string
): Promise<void> {
  async function handleProfile(profileDirectory?: string) {
    await openBrowser(browserName, url, profileDirectory);
  }

  const profileArg = args.profile as typeof args.profile | string[];
  const defaults = getDefaultsData();
  const defaultProfile = defaults.profile?.[browserName];

  // profile provided in args
  if (profileArg != null) {
    // one profile provided
    if (!Array.isArray(profileArg)) {
      const profile = getProfile(profileArg, browserName);
      await handleProfile(profile?.directory);
    }
    // multiple profiles provided
    else {
      profileArg.forEach(async (p) => {
        const profile = getProfile(p, browserName);
        await handleProfile(profile?.directory);
      });
    }
  }
  // profile provided in config defaults
  else if (defaultProfile != null) {
    const profile = getProfile(defaultProfile, browserName);
    await handleProfile(profile?.directory);
  }
}
