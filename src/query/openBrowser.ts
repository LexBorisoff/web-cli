import open, { openApp } from "open";
import { getBrowserArguments, getBrowserAppName } from "../helpers/browser";

export default function openBrowser(
  browserName: string,
  url?: string,
  profileDirectory?: string
): void {
  const browserAppName = getBrowserAppName(browserName);
  const browserArguments = getBrowserArguments(browserName, profileDirectory);

  if (url != null) {
    open(url, {
      app: { name: browserAppName, arguments: browserArguments },
    });
    return;
  }

  // opens empty browser
  openApp(browserAppName, { arguments: browserArguments });
}
