import getArgs from "./getArgs";
import getCustomArgs from "./getCustomArgs";
import { combineArgLists } from "./utils";
import { getEnginesData } from "../../data";

const { engine } = getArgs();

/**
 * Returns a list of engine names and aliases supplied to the CLI
 * using both "--engine name" and "--name" formats
 */
export default function getEngineArgs(): string[] {
  const optionArg = engine as typeof engine | string[];
  const enginesData = getEnginesData();
  const customArgs = getCustomArgs(enginesData);
  return combineArgLists(optionArg, customArgs);
}
