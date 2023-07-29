import open from "open";
import queryProfile from "./profile";
import openBrowser from "./openBrowser";
import { getBrowserArgs, getProfileArgs } from "../command";
import { getDefaultsData, getBrowsersData } from "../data";
import { printError } from "../helpers/print";

const defaults = getDefaultsData();
const browsers = getBrowsersData();

/**
 * Returns the browser key from the config
 * or the provided argument, if cannot find
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
  return getProfileArgs(browserName).length > 0;
}

function handleBrowser(browserName: string, url?: string): void {
  if (hasProfile(browserName)) {
    queryProfile(browserName, url);
  } else {
    openBrowser(browserName, url);
  }
}

export default function queryBrowser(url?: string): void {
  const browserArgs = getBrowserArgs();

  // browser(s) provided in args
  if (browserArgs.length > 0) {
    browserArgs.forEach((browserNameOrAlias) => {
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
