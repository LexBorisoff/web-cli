import open from "open";
import getBrowserArguments from "./getBrowserArguments";
import { getBrowser, getProfile } from "../helpers";
import { defaults } from "../data";

export default async function openBrowserEmpty() {
  if (defaults.browser) {
    const browser = getBrowser(defaults.browser);
    if (browser) {
      const defaultProfile = defaults.profile?.[defaults.browser];
      const profile =
        defaultProfile && getProfile(defaultProfile, defaults.browser);

      // const browserArguments = profile
      // ? [`--profile-directory=${profile}`]
      // : [""];

      const browserArguments = getBrowserArguments(defaults.browser, profile);
      console.log(browserArguments);

      await open.openApp(browser, {
        arguments: browserArguments,
      });
    }
  }
}
