import { getArgs } from "../command";
import openUrl from "./openUrl";
import openBrowser from "./openBrowser";
import openBrowserEmpty from "./openBrowserEmpty";

const args = getArgs();

export default async function query(url?: string) {
  // browser provided through args or as default
  if (args.browser) {
    await openBrowser(url);
  }
  // browser NOT provided but has url to query
  else if (url) {
    await openUrl(url);
  }
  // open browser without searching anything
  else {
    await openBrowserEmpty();
  }
}
