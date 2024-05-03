import { Browser } from "@lexjs/web-search";
import type { QueryBrowser } from "../types/query.types.js";
import { dataArgs } from "../command/args/data-args.js";
import { defaultsData } from "../data/defaults-data.js";
import { getBrowserName } from "../helpers/browser/get-browser-name.js";
import { getProfilesConfig } from "./get-profiles-config.js";

const browserArgs = dataArgs.browser();

export function getQueryBrowsers(): QueryBrowser[] {
  if (browserArgs.length === 0) {
    if (defaultsData.browser == null) {
      return [];
    }

    const [defaultBrowserName] = defaultsData.browser;
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
