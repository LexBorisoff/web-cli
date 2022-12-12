import open from "open";
import getBrowserArguments from "./getBrowserArguments";
import { getBrowser } from "../helpers";

export default async function openQuery(
  browserName?: string,
  url?: string,
  profileDirectory?: string
) {
  if (browserName) {
    const browser = getBrowser(browserName);
    const browserArguments = getBrowserArguments(browserName, profileDirectory);
    console.log(browserArguments);

    if (url != null && url !== "") {
      await open(url, {
        app: { name: browser, arguments: browserArguments },
      });
    } else {
      await open.openApp(browser, { arguments: browserArguments });
    }
  }
}
