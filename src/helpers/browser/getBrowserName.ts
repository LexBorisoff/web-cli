import { getBrowsersData } from "../../data";

const browsers = getBrowsersData();

/**
 * Returns the browser key from the config if it can be found,
 * otherwise returns the provided argument
 */
export default function getBrowserName(browserNameOrAlias: string): string {
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
