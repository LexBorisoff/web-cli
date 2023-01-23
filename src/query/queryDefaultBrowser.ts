/**
 * opens URL in default browser specified in config file or by OS
 */

import open from "open";
import { getBrowserArguments } from "../helpers";
import { getArgs } from "../command";
import { getDefaultsData } from "../data";

const args = getArgs();

export default async function queryDefaultBrowser(url: string) {
  const protocol = `http${args.secure ? "s" : ""}://`;
  const fullUrl = /^http/is.test(url) ? url : `${protocol}${url}`;
  const defaults = await getDefaultsData();

  if (defaults.browser) {
    const browserArguments = getBrowserArguments();
    await open(fullUrl, {
      app: { name: defaults.browser, arguments: browserArguments },
    });
  } else {
    await open(fullUrl);
  }
}
