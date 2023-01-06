import openBrowser from "./openBrowser";
import openBrowserDefault from "./openBrowserDefault";
import openBrowserEmpty from "./openBrowserEmpty";
import { getArgs } from "../command";
import { defaults } from "../data";

const args = getArgs();

export default async function query(url?: string) {
  // browser provided through args
  if (args.browser || defaults.browser) {
    await openBrowser(url);
  }
  // browser NOT provided but has url to query
  else if (url) {
    await openBrowserDefault(url);
  }
  // open browser without searching anything
  else {
    await openBrowserEmpty();
  }
}
