import queryBrowserProfile from "./queryBrowserProfile";
import queryUrl from "./queryUrl";
import { getArgs } from "../command";
import { getBrowser } from "../helpers";
import { defaults } from "../data";

const args = getArgs();

export default async function queryBrowser(url?: string) {
  function hasDefaultProfile(browser: string): boolean {
    return defaults.profile?.[browser] != null;
  }

  async function openBrowser(browserName: string) {
    const foundBrowser = getBrowser(browserName);
    console.log("foundBrowser", foundBrowser);
    if (foundBrowser) {
      if (args.profile || hasDefaultProfile(foundBrowser)) {
        console.log("---> profile");
        await queryBrowserProfile(foundBrowser, url);
      }
      // profile NOT provided
      else {
        console.log("---> NO profile");
        await queryUrl(foundBrowser, url);
      }
    }
  }

  const browser = args.browser ?? defaults.browser;

  if (browser) {
    // one browser provided
    if (!Array.isArray(browser)) {
      console.log("1 browser", browser);
      openBrowser(browser);
    }
    // multiple browsers provided
    else {
      console.log("multiple browsers", browser);
      browser.forEach((browserName) => {
        openBrowser(browserName);
      });
    }
  }
}
