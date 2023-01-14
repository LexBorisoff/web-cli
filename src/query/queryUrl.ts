import open from "open";
import { getBrowserArguments, getBrowserAppName } from "../helpers";

export default async function queryUrl(
  browser: string,
  url?: string,
  profile?: string
) {
  const browserApp = getBrowserAppName(browser);
  const browserArguments = getBrowserArguments(browser, profile);

  if (url != null && url !== "") {
    await open(url, {
      app: { name: browserApp, arguments: browserArguments },
    });
  } else {
    console.log("browserApp", browserApp);
    await open.openApp(browserApp, { arguments: browserArguments });
  }
}
