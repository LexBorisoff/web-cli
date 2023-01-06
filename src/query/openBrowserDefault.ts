import open from "open";
import getBrowserArguments from "./getBrowserArguments";
import { getArgs } from "../command";
import { defaults } from "../data";

const args = getArgs();

export default async function openBrowserDefault(url: string) {
  const protocol = `http${args.secure ? "s" : ""}://`;
  const fullUrl = /^http/is.test(url) ? url : `${protocol}${url}`;

  if (defaults.browser) {
    const browserArguments = getBrowserArguments();
    await open(fullUrl, {
      app: { name: defaults.browser, arguments: browserArguments },
    });
  } else {
    await open(fullUrl);
  }
}
