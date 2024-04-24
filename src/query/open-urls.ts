import open from "open";
import { queryArgs } from "../command/args/query-args.js";
import { getProfiles } from "../helpers/browser/get-profiles.js";
import { BrowserQuery } from "../types/browser-query.type.js";
import { getBrowsers } from "./get-browsers.js";

const { peek, incognito } = queryArgs;

export function openUrls(urls: string[]): BrowserQuery[] {
  const browsers = getBrowsers();

  if (browsers.length === 0) {
    if (!peek) {
      Promise.all(
        urls.map((link) => {
          open(link);
        })
      );
    }

    return [];
  }

  const browserQueries = browsers.map<BrowserQuery>(([browser]) => ({
    browser,
    profiles: getProfiles(browser).map(([profile]) => profile),
  }));

  if (!peek) {
    Promise.all(
      browsers.map(([browserName, browser]) => {
        const browserProfiles = getProfiles(browserName);
        browser.open(urls, {
          profile: browserProfiles.map(([, profile]) => profile.directory),
          incognito,
        });
      })
    );
  }

  return browserQueries;
}
