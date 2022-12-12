import { Browser } from "../types";
import { browsers } from "../data";

export default function getBrowserName(
  nameFromArgs: string
): string | undefined {
  const foundBrowser = browsers.find((browser: string | Browser) => {
    if (typeof browser === "string") {
      return browser === nameFromArgs;
    }

    return (
      browser.name === nameFromArgs ||
      (typeof browser?.alias === "string" && browser.alias === nameFromArgs) ||
      (Array.isArray(browser.alias) && browser.alias.includes(nameFromArgs))
    );
  });

  if (foundBrowser) {
    return typeof foundBrowser === "string" ? foundBrowser : foundBrowser.name;
  }
}
