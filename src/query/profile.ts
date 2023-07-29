import openBrowser from "./openBrowser";
import { getProfileArgs } from "../command";
import { getDefaultsData, getProfilesData } from "../data";
import { getProfile } from "../helpers/browser";
import { printWarning, printError, emptyLine } from "../helpers/print";
import { getTitle } from "../helpers/prompts";

function getProfileFlags(browserName: string) {
  const profilesData = getProfilesData(browserName);
  return Object.entries(profilesData)
    .map(([key, { alias }]) => {
      if (alias != null) {
        return Array.isArray(alias) ? [key, ...alias] : [key, alias];
      }
      return key;
    })
    .flat();
}

export default function queryProfile(browserName: string, url?: string): void {
  function handleProfile(profileDirectory?: string): void {
    openBrowser(browserName, url, profileDirectory);
  }

  const profileArgs = getProfileArgs(browserName);
  const profileFlags = getProfileFlags(browserName);

  // single option was provided without a value
  const isEmptyArg = profileArgs.length === 1 && profileArgs[0] === "";
  if (isEmptyArg) {
    printError("Profile option must have a value");
    emptyLine();
    return;
  }

  // invalid profile values were supplied (excluding empty value)
  const invalidProfiles = profileArgs.filter(
    (arg) => arg !== "" && !profileFlags.includes(arg)
  );
  if (invalidProfiles.length > 0) {
    printError(`Invalid ${getTitle(browserName)} profiles:`);
    printWarning(invalidProfiles.join(", "));
    emptyLine();
    return;
  }

  const validProfiles = profileArgs.filter((arg) => arg !== "");
  const defaultProfile = getDefaultsData().profile?.[browserName];

  // profile(s) provided in args
  if (validProfiles.length > 0) {
    validProfiles.forEach((profileNameOrAlias) => {
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
