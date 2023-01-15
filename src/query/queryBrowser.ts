import queryBrowserProfile, { hasProfile } from "./queryBrowserProfile";
import queryUrl from "./queryUrl";
import { getArgs } from "../command";
import { getBrowser } from "../helpers";
import { defaults } from "../data";

const args = getArgs();

export default async function queryBrowser(url?: string) {
  async function openBrowser(browserNameOrAlias: string) {
    const browser = getBrowser(browserNameOrAlias);
    if (browser != null) {
      const browserName = typeof browser === "string" ? browser : browser.name;

      if (hasProfile(browserName)) {
        await queryBrowserProfile(browserName, url);
      }
      // profile NOT provided
      else {
        await queryUrl(browserName, url);
      }
    }
  }

  const browser = args.browser ?? defaults.browser;

  if (browser != null) {
    // one browser provided
    if (!Array.isArray(browser)) {
      openBrowser(browser);
    }
    // multiple browsers provided
    else {
      browser.forEach((browserFromArgs) => {
        openBrowser(browserFromArgs);
      });
    }
  }
}
