import open from "open";
import queryProfile, { hasProfile } from "./profile";
import openBrowser from "./openBrowser";
import { getArgs } from "../command";
import { getDefaultsData, getBrowsersData } from "../data";
import { printError } from "../helpers/print";

const args = getArgs();

/**
 * returns the found browser key from config or the provided argument
 */
function getBrowserName(browserNameOrAlias: string): string {
  const browsers = getBrowsersData();

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

export default async function queryBrowser(url?: string): Promise<void> {
  const defaults = getDefaultsData();

  async function handleBrowser(browserName: string): Promise<void> {
    if (hasProfile(browserName)) {
      await queryProfile(browserName, url);
    } else {
      await openBrowser(browserName, url);
    }
  }

  const browserArg = args.browser as typeof args.browser | string[];
  const browser = browserArg ?? defaults.browser;

  // with provided or default browser
  if (browser != null) {
    // one browser provided
    if (!Array.isArray(browser)) {
      handleBrowser(getBrowserName(browser));
    }
    // multiple browsers provided
    else {
      browser.forEach((b) => {
        handleBrowser(getBrowserName(b));
      });
    }
  }
  // no browser but has url
  else if (url != null) {
    await open(url);
  }
  // no browser and no url
  else {
    printError("Provide default browser to open\n");
  }
}
