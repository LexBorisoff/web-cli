import { Browser } from "@lexjs/browser-search";
import { getDataArgs } from "../command/args/get-data-args.js";
import { getDefaultsData } from "../data/get-defaults-data.js";
import { getBrowserName } from "../helpers/browser/get-browser-name.js";
import { getProfilesConfig } from "./get-profiles-config.js";

const defaults = getDefaultsData();
const browserArgs = getDataArgs.browser();

export function getBrowsers(): [string, Browser<string, any>][] {
  if (browserArgs.length === 0) {
    if (defaults.browser == null) {
      return [];
    }

    const [defaultBrowserName] = defaults.browser;
    return [
      [
        defaultBrowserName,
        new Browser(defaultBrowserName, {
          profiles: getProfilesConfig(defaultBrowserName),
        }),
      ],
    ];
  }

  return browserArgs.map((browserNameOrAlias) => {
    const browserName = getBrowserName(browserNameOrAlias);

    return [
      browserName,
      new Browser(browserName, {
        profiles: getProfilesConfig(browserName),
      }),
    ];
  });
}
