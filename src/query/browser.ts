import open from "open";
import queryProfile, { hasProfile } from "./profile";
import openBrowser from "./openBrowser";
import { getArgs } from "../command";
import { getDefaultsData } from "../data";
import { getBrowser } from "../helpers/browser";
import { printError } from "../helpers/print";

const args = getArgs();

export default async function queryBrowser(url?: string): Promise<void> {
  async function handleBrowser(browserNameOrAlias: string): Promise<void> {
    const browser = getBrowser(browserNameOrAlias);
    if (browser != null) {
      const browserName = typeof browser === "string" ? browser : browser.name;

      if (hasProfile(browserName)) {
        await queryProfile(browserName, url);
      } else {
        await openBrowser(browserName, url);
      }
    }
  }

  const defaults = getDefaultsData();
  const browserArg = args.browser as typeof args.browser | string[];
  const browser = browserArg ?? defaults.browser;

  // with provided or default browser
  if (browser != null) {
    // one browser provided
    if (!Array.isArray(browser)) {
      handleBrowser(browser);
    }
    // multiple browsers provided
    else {
      browser.forEach((browserName) => {
        handleBrowser(browserName);
      });
    }
  }
  // no browser but has url
  else if (url != null) {
    await open(url);
  }
  // no browser and no url
  else {
    printError("Provide default browser to open");
  }
}
