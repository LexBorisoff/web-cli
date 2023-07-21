import getCustomArgs from "./getCustomArgs";
import { getBrowsersData } from "../data";

/**
 * Returns a list of browser names and aliases supplied in args
 * using the form "--name" instead of "--browser name" or "-b name"
 * based on the browser names and aliases provided in the config file
 */
export default function getBrowserArgs(): string[] {
  const enginesData = getBrowsersData();
  return getCustomArgs(enginesData);
}
