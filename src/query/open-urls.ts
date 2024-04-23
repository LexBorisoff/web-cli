import { getQueryArgs } from "../command/args/get-query-args.js";
import { getProfiles } from "../helpers/browser/get-profiles.js";
import { severity } from "../helpers/print/severity.js";
import { getBrowsers } from "./get-browsers.js";

const { ...options } = getQueryArgs();
const { info, success, error, warning } = severity;

export async function openUrls(urls: string[]): Promise<void> {
  const browsers = getBrowsers();

  if (browsers.length === 0) {
    await Promise.all(
      urls.map((link) => {
        open(link);
      })
    );
    return;
  }

  await Promise.all(
    browsers.map(([browserName, browser]) => {
      const browserProfiles = getProfiles(browserName);
      browser.open(urls, {
        profile: browserProfiles.map(([, profile]) => profile.directory),
        incognito: options.incognito,
      });
    })
  );
}
