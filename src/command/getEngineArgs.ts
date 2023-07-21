import getCustomArgs from "./getCustomArgs";
import { getEnginesData } from "../data";

/**
 * Returns a list of engine names and aliases supplied in args
 * using the form "--name" instead of "--engine name" or "-e name"
 * based on the engine names and aliases provided in the config file
 */
export default function getEngineArgs(): string[] {
  const enginesData = getEnginesData();
  return getCustomArgs(enginesData);
}
