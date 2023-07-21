import open from "open";
import queryProfile from "./profile";
import openBrowser from "./openBrowser";
import {
  getArgs,
  getBrowserArgs,
  getBrowserProfileArgs,
  getArgsList,
} from "../command";
import { getDefaultsData, getBrowsersData } from "../data";
import { printError } from "../helpers/print";

const args = getArgs();
const defaults = getDefaultsData();
const browsers = getBrowsersData();

/**
 * returns the found browser key from config or the provided argument
 */
function getBrowserName(browserNameOrAlias: string): string {
  const foundBrowser = Object.entries(browsers).find(([key, browser]) => {
    const isConfigKey = browserNameOrAlias === key;
    const isAlias =
      // alias is a string
      (typeof browser.alias === "string" &&
        browserNameOrAlias === browser.alias) ||
      // alias is an array
      (Array.isArray(browser.alias) &&
        browser.alias.includes(browserNameOrAlias));

    return isConfigKey || isAlias;
  });

  if (foundBrowser != null) {
    const [key] = foundBrowser;
    return key;
  }

  return browserNameOrAlias;
}

function hasProfile(browserName: string): boolean {
  const profilesArgs = getBrowserProfileArgs(browserName);
  return (
    args.profile != null ||
    defaults.profile?.[browserName] != null ||
    profilesArgs.length > 0
  );
}

function handleBrowser(browserName: string, url?: string): void {
  if (hasProfile(browserName)) {
    queryProfile(browserName, url);
  } else {
    openBrowser(browserName, url);
  }
}

export default function queryBrowser(url?: string): void {
  const browserArgs = args.browser as typeof args.browser | string[];
  const customArgs = getBrowserArgs();
  const list = getArgsList(browserArgs, customArgs);

  // browser(s) provided in args
  if (list.length > 0) {
    list.forEach((browserNameOrAlias) => {
      handleBrowser(getBrowserName(browserNameOrAlias), url);
    });
  }
  // default browser exists in config
  else if (defaults.browser != null) {
    handleBrowser(getBrowserName(defaults.browser), url);
  }
  // no browser but has url
  else if (url != null) {
    open(url);
  }
  // no browser and no url
  else {
    printError("Provide a default browser to open\n");
  }
}
