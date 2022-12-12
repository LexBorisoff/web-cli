import openQuery from "./openQuery";
import { getArgs } from "../command";
import { getProfile } from "../helpers";
import { defaults } from "../data";
const args = getArgs();

export default async function openProfile(browserName: string, url?: string) {
  // profile provided in args
  if (args.profile) {
    // one profile provided
    if (!Array.isArray(args.profile)) {
      const profile = getProfile(args.profile, browserName);
      await openQuery(browserName, url, profile);
    }
    // multiple profiles provided
    else {
      args.profile.forEach(async (profileFromArgs) => {
        const profile = getProfile(profileFromArgs, browserName);
        await openQuery(browserName, url, profile);
      });
    }
  }
  // profile provided in config defaults
  else if (defaults.profile) {
    const defaultProfile = defaults.profile[browserName];
    const profile = getProfile(defaultProfile, browserName);
    await openQuery(browserName, url, profile);
  }
}
