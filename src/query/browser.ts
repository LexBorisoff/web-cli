import open from "open";
import queryProfile from "./profile";
import openBrowser from "./openBrowser";
import { getArgs } from "../command";
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
  return args.profile != null || defaults.profile?.[browserName] != null;
}

function handleBrowser(browserName: string, url?: string): void {
  if (hasProfile(browserName)) {
    queryProfile(browserName, url);
  } else {
    openBrowser(browserName, url);
  }
}

export default function queryBrowser(url?: string): void {
  const browserArg = args.browser as typeof args.browser | string[];

  // with provided or default browser
  if (browserArg != null) {
    // one browser provided
    if (!Array.isArray(browserArg)) {
      handleBrowser(getBrowserName(browserArg), url);
    }
    // multiple browsers provided
    else {
      browserArg.forEach((arg) => {
        handleBrowser(getBrowserName(arg), url);
      });
    }
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
