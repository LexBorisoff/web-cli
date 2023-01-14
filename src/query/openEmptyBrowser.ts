import open from "open";
import { getBrowserArguments, getBrowserAppName, getProfile } from "../helpers";
import { defaults } from "../data";

export default async function openEmptyBrowser() {
  if (defaults.browser) {
    const browser = getBrowserAppName(defaults.browser);

    if (browser) {
      const defaultProfile = defaults.profile?.[defaults.browser];
      const profile =
        defaultProfile && getProfile(defaultProfile, defaults.browser);

      const browserArguments = getBrowserArguments(defaults.browser, profile);

      await open.openApp(browser, {
        arguments: browserArguments,
      });
    }
  } else {
    console.error("Provide default browser to open");
  }
}
