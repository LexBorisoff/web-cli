import open from "open";
import { getQueryArgs } from "../command/args/get-query-args.js";
import { getProfiles } from "../helpers/browser/get-profiles.js";
import { BrowserQuery } from "../types/browser-query.type.js";
import { getBrowsers } from "./get-browsers.js";

const { peek, incognito } = getQueryArgs();

export async function openUrls(urls: string[]): Promise<BrowserQuery[]> {
  const browsers = getBrowsers();

  if (browsers.length === 0) {
    if (!peek) {
      await Promise.all(
        urls.map((link) => {
          open(link);
        })
      );
    }

    return [];
  }

  const browserQueries: BrowserQuery[] = [];

  await Promise.all(
    browsers.map(([browserName, browser]) => {
      const browserProfiles = getProfiles(browserName);

      browserQueries.push({
        browser: browserName,
        profiles: browserProfiles.map(([profile]) => profile),
      });

      if (!peek) {
        browser.open(urls, {
          profile: browserProfiles.map(([, profile]) => profile.directory),
          incognito,
        });
      }
    })
  );

  return browserQueries;
}
