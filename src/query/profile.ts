import openBrowser from "./openBrowser";
import { getProfileArgs, isEmptyArg } from "../command";
import { getDefaultsData, browserProfileFlags } from "../data";
import { getProfile } from "../helpers/browser";
import { printWarning, printError, emptyLine } from "../helpers/print";
import { getTitle } from "../helpers/prompts";

export default function queryProfile(browserName: string, url?: string): void {
  function handleProfile(profileDirectory?: string): void {
    openBrowser(browserName, url, profileDirectory);
  }

  const profileArgs = getProfileArgs(browserName);

  // single option was provided without a value
  if (isEmptyArg(profileArgs)) {
    printError("Profile option must have a value");
    emptyLine();
    return;
  }

  // invalid profile values were supplied (excluding empty value)
  const invalidProfiles = profileArgs.filter(
    (arg) => arg !== "" && !browserProfileFlags[browserName].includes(arg)
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
