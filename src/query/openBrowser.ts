import open from "open";
import { getBrowserArguments, getBrowserAppName } from "../helpers/browser";

export default async function openBrowser(
  browserName: string,
  url?: string,
  profileDirectory?: string
): Promise<void> {
  const browserAppName = getBrowserAppName(browserName);
  const browserArguments = getBrowserArguments(browserName, profileDirectory);

  if (url != null) {
    await open(url, {
      app: { name: browserAppName, arguments: browserArguments },
    });
    return;
  }

  // opens empty browser
  await open.openApp(browserAppName, { arguments: browserArguments });
}
