import open from "open";
import queryProfile from "./profile";
import openBrowser from "./openBrowser";
import { getDataArgs } from "../command";
import { getDefaultsData } from "../data";
import { getBrowserName, hasProfile } from "../helpers/browser";
import { printError } from "../helpers/print";

const defaults = getDefaultsData();

function handleBrowser(browserName: string, url?: string): void {
  if (hasProfile(browserName)) {
    queryProfile(browserName, url);
    return;
  }
  openBrowser(browserName, url);
}

export default function queryBrowser(url?: string): void {
  const browserArgs = getDataArgs.browser();

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
