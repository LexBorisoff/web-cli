import open from "open";
import getBrowserArguments from "./getBrowserArguments";
import { getBrowserAppName } from "../helpers";

export default async function openUrl(
  url?: string,
  browserName?: string,
  profileDirectory?: string
) {
  if (browserName) {
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
}
