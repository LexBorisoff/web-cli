import openBrowser from "./openBrowser";
import { getArgs, getArgsList, getBrowserProfileArgs } from "../command";
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
  const customArgs = getBrowserProfileArgs(browserName);
  const list = getArgsList(profileArg, customArgs);

  // profile(s) provided in args
  if (list.length > 0) {
    list.forEach((profileNameOrAlias) => {
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
