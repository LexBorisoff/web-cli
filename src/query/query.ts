import queryBrowser from "./queryBrowser";
import queryDefaultBrowser from "./queryDefaultBrowser";
import openEmptyBrowser from "./openEmptyBrowser";
import { getArgs } from "../command";
import { defaults } from "../data";

const args = getArgs();

export default async function query(url?: string) {
  // browser provided through args
  if (args.browser || defaults.browser) {
    await queryBrowser(url);
  }
  // browser NOT provided but has url to query
  else if (url) {
    await queryDefaultBrowser(url);
  }
  // open browser without searching anything
  else {
    await openEmptyBrowser();
  }
}
