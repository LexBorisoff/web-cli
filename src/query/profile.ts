import openBrowser from "./openBrowser";
import { getArgs } from "../command";
import { getDefaultsData } from "../data";
import { getProfile } from "../helpers/browser";

const args = getArgs();

export default function queryProfile(browserName: string, url?: string): void {
  function handleProfile(profileDirectory?: string): void {
    openBrowser(browserName, url, profileDirectory);
  }

  const profileArg = args.profile as typeof args.profile | string[];
  const defaults = getDefaultsData();
  const defaultProfile = defaults.profile?.[browserName];

  // profile provided in args
  if (profileArg != null) {
    // one profile provided
    if (!Array.isArray(profileArg)) {
      const profile = getProfile(profileArg, browserName);
      handleProfile(profile?.directory);
    }
    // multiple profiles provided
    else {
      profileArg.forEach((arg) => {
        const profile = getProfile(arg, browserName);
        handleProfile(profile?.directory);
      });
    }
  }
  // profile provided in config defaults
  else if (defaultProfile != null) {
    const profile = getProfile(defaultProfile, browserName);
    handleProfile(profile?.directory);
  }
}
