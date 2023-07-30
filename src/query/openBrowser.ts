import open, { openApp } from "open";
import { getArgs } from "../command/args";
import {
  getBrowserArguments,
  getBrowserAppName,
  getProfile,
} from "../helpers/browser";

const { incognito } = getArgs();

export default function openBrowser(
  browserName: string,
  profiles: string[],
  urls: string[]
): void {
  const browserAppName = getBrowserAppName(browserName);

  function handleOpen(openCallback: (browserArguments: string[]) => void) {
    if (profiles.length > 0) {
      profiles.forEach((profileNameOrAlias) => {
        const [, profile] = getProfile(browserName, profileNameOrAlias) ?? [];
        const browserArguments = getBrowserArguments(
          browserName,
          profile?.directory,
          incognito
        );

        openCallback(browserArguments);
      });
    } else {
      const browserArguments = getBrowserArguments(
        browserName,
        null,
        incognito
      );
      openCallback(browserArguments);
    }
  }

  // open URLs
  if (urls.length > 0) {
    urls.forEach((url) => {
      handleOpen((browserArguments) => {
        open(url, {
          app: { name: browserAppName, arguments: browserArguments },
        });
      });
    });
  }
  // open empty browser
  else {
    handleOpen((browserArguments) => {
      openApp(browserAppName, { arguments: browserArguments });
    });
  }
}
