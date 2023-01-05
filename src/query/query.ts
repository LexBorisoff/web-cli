import openUrl from "./openUrl";
import openBrowser from "./openBrowser";
import openBrowserEmpty from "./openBrowserEmpty";
import { getArgs } from "../command";

const args = getArgs();

export default async function query(url?: string) {
  // browser provided through args or as default
  if (args.browser) {
    console.log(1);
    await openBrowser(url);
  }
  // browser NOT provided but has url to query
  else if (url) {
    console.log(2, url);
    await openUrl(url);
  }
  // open browser without searching anything
  else {
    console.log(3);
    await openBrowserEmpty();
  }
}
