import open from "open";
import { Browser } from "../types";
import { browsers } from "../data";

export function getBrowserAppName(browserName: string) {
  switch (browserName) {
    case "chrome":
      return open.apps.chrome;
    case "firefox":
      return open.apps.firefox;
    case "edge":
      return open.apps.edge;
    default:
      return browserName;
  }
}

export default function getBrowser(
  browserFromArgs: string
): string | undefined {
  const foundBrowser = browsers.find((browser: string | Browser) => {
    if (typeof browser === "string") {
      return browser === browserFromArgs;
    }

    return (
      browser.name === browserFromArgs ||
      (typeof browser?.alias === "string" &&
        browser.alias === browserFromArgs) ||
      (Array.isArray(browser.alias) && browser.alias.includes(browserFromArgs))
    );
  });

  if (foundBrowser) {
    return typeof foundBrowser === "string" ? foundBrowser : foundBrowser.name;
  }
}
