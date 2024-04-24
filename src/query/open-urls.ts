import open from "open";
import { queryArgs } from "../command/args/query-args.js";
import { getProfiles } from "../helpers/browser/get-profiles.js";
import { BrowserProfileQuery } from "../types/query.types.js";
import { getQueryBrowsers } from "./get-query-browsers.js";

const { peek, incognito } = queryArgs;

export function openUrls(urls: string[]): BrowserProfileQuery[] {
  const browsers = getQueryBrowsers();

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

  const queries = browsers.map<BrowserProfileQuery>(([browser]) => ({
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

  return queries;
}
