import open from "open";
import { getBrowserArguments, getBrowserAppName } from "../helpers/browser";

export default async function queryUrl(
  browserName: string,
  url?: string,
  profileDirectory?: string
) {
  const browserAppName = getBrowserAppName(browserName);
  const browserArguments = getBrowserArguments(browserName, profileDirectory);

  if (url != null && url !== "") {
    await open(url, {
      app: { name: browserAppName, arguments: browserArguments },
    });
  } else {
    await open.openApp(browserAppName, { arguments: browserArguments });
  }
}
