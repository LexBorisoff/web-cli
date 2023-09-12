import open from "open";
import openBrowser from "./openBrowser";
import { withProfile } from "../command/with";
import { getDataArgs } from "../command/args";
import { getDefaultsData } from "../data";
import { getBrowserName, getProfile } from "../helpers/browser";
import { printError } from "../helpers/print";
import { BrowserQuery } from "../types/query.types";

const defaults = getDefaultsData();
const browserArgs = getDataArgs.browser();

/**
 * Returns a list of profile keys from the config
 * for a provided browser name
 */
function getProfiles(browserName: string): string[] {
  const profiles: string[] = [];

  function addToProfiles(profileNameOrAlias: string) {
    const profile = getProfile(browserName, profileNameOrAlias);
    if (profile != null) {
      const [profileName] = profile;
      profiles.push(profileName);
    }
  }

  if (withProfile(browserName)) {
    const profileArgs = getDataArgs.profile(browserName);
    const defaultProfile = defaults.profile(browserName);

    if (profileArgs.length > 0) {
      profileArgs.forEach((profileNameOrAlias) => {
        addToProfiles(profileNameOrAlias);
      });
    } else if (defaultProfile != null) {
      addToProfiles(defaultProfile);
    }
  }

  return profiles;
}

/**
 * Handles opening browsers with provided URLs.
 * Returns a list of BrowserQuery objects
 */
export default function queryBrowsers(urls: string[]): BrowserQuery[] {
  const browserQueries: BrowserQuery[] = [];

  // browser(s) provided in args
  if (browserArgs.length > 0) {
    browserArgs.forEach((browserNameOrAlias) => {
      const browserName = getBrowserName(browserNameOrAlias);
      const profiles = getProfiles(browserName);
      browserQueries.push({ browser: browserName, profiles });
      openBrowser(browserName, profiles, urls);
    });
  }
  // default browser exists in config
  else if (defaults.browser != null) {
    const browserName = getBrowserName(defaults.browser);
    const profiles = getProfiles(browserName);
    browserQueries.push({ browser: browserName, profiles });
    openBrowser(browserName, profiles, urls);
  }
  // no browser but has urls
  else if (urls.length > 0) {
    urls.forEach((url) => {
      open(url);
    });
  }
  // no browser and no urls
  else {
    printError("Provide a search query and/or a browser to open");
  }

  return browserQueries;
}
