import open from "open";
import { getDefaultsData } from "../data";
import getBrowserArguments from "../helpers/getBrowserArguments";
import getBrowserAppName from "../helpers/getBrowserAppName";
import getProfile from "../helpers/getProfile";

export default async function openEmptyBrowser() {
  const defaults = await getDefaultsData();

  if (defaults.browser) {
    const browser = getBrowserAppName(defaults.browser);

    if (browser) {
      const defaultProfile = defaults.profile?.[defaults.browser];
      const profile = defaultProfile
        ? await getProfile(defaultProfile, defaults.browser)
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
