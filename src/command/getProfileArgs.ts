import getArgs from "./getArgs";
import getCustomArgs from "./getCustomArgs";
import { combineArgLists } from "./utils";
import { getProfilesData } from "../data";

const { profile } = getArgs();

/**
 * Returns a list of profile names and aliases supplied to the CLI
 * using both "--profile name" and "--name" formats
 */
export default function getProfileArgs(browserName: string): string[] {
  const optionArg = profile as typeof profile | string[];
  const profilesData = getProfilesData(browserName);
  const customArgs = getCustomArgs(profilesData);
  return combineArgLists(optionArg, customArgs);
}
