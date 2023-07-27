import getArgs from "./getArgs";
import getCustomArgs from "./getCustomArgs";
import { combineArgLists } from "./utils";
import { getBrowsersData } from "../data";

const { browser } = getArgs();

/**
 * Returns a list of browser names and aliases supplied to the CLI
 * using both "--browser name" and "--name" formats
 */
export default function getBrowserArgs(): string[] {
  const optionArg = browser as typeof browser | string[];
  const browsersData = getBrowsersData();
  const customArgs = getCustomArgs(browsersData);
  return combineArgLists(optionArg, customArgs);
}
