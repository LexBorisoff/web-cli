/**
 * opens URL in default browser specified in config file or by OS
 */

import open from "open";
import { getArgs } from "../command";
import { getDefaultsData } from "../data";
import { getBrowserAppName, getBrowserArguments } from "../helpers/browser";

const args = getArgs();

export default async function queryDefaultBrowser(url: string): Promise<void> {
  const protocol = `http${args.secure ? "s" : ""}://`;
  const fullUrl = /^http/is.test(url) ? url : `${protocol}${url}`;
  const defaults = getDefaultsData();

  if (defaults.browser) {
    const browserName = getBrowserAppName(defaults.browser);
    const browserArguments = getBrowserArguments();

    await open(fullUrl, {
      app: { name: browserName, arguments: browserArguments },
    });
  } else {
    await open(fullUrl);
  }
}
