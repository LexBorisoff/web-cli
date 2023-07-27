import openBrowser from "./openBrowser";
import { getProfileArgs } from "../command";
import { getDefaultsData } from "../data";
import { getProfile } from "../helpers/browser";

export default function queryProfile(browserName: string, url?: string): void {
  function handleProfile(profileDirectory?: string): void {
    openBrowser(browserName, url, profileDirectory);
  }

  const profileArgs = getProfileArgs(browserName);
  const defaultProfile = getDefaultsData().profile?.[browserName];

  // profile(s) provided in args
  if (profileArgs.length > 0) {
    profileArgs.forEach((profileNameOrAlias) => {
      const profile = getProfile(profileNameOrAlias, browserName);
      handleProfile(profile?.directory);
    });
  }
  // profile provided in config defaults
  else if (defaultProfile != null) {
    const profile = getProfile(defaultProfile, browserName);
    handleProfile(profile?.directory);
  }
}
