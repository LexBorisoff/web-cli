import open from "open";
import { getDefaultsData } from "../data";
import {
  getBrowserArguments,
  getBrowserAppName,
  getProfile,
} from "../helpers/browser";

export default async function openEmptyBrowser(): Promise<void> {
  const defaults = getDefaultsData();

  if (defaults.browser) {
    const browser = getBrowserAppName(defaults.browser);

    if (browser) {
      const defaultProfile = defaults.profile?.[defaults.browser];
      const profile =
        defaultProfile != null
          ? getProfile(defaultProfile, defaults.browser)
          : null;

      const browserArguments = getBrowserArguments(
        defaults.browser,
        profile?.directory
      );

      await open.openApp(browser, {
        arguments: browserArguments,
      });
    }
  } else {
    console.error("Provide default browser to open");
  }
}
