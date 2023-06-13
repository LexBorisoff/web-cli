import queryBrowser from "./queryBrowser";
import queryDefaultBrowser from "./queryDefaultBrowser";
import openEmptyBrowser from "./openEmptyBrowser";
import { getArgs } from "../command";
import { getDefaultsData } from "../data";

const args = getArgs();

export default async function query(url?: string): Promise<void> {
  const defaults = getDefaultsData();

  // browser provided through args or in config defaults
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
