import getArgs from "./getArgs";
import { combineArgLists } from "./utils";
import { options } from "../options";
import { getBrowsersData, getEnginesData, getProfilesData } from "../../data";
import { WithAlias } from "../../types/utility.types";

const args = getArgs();

interface Data<T> {
  [key: string]: T;
}

/**
 * Returns a list of arg options supplied to the CLI that are
 * specific to config data and do not match standard args
 */
function getCustomArgs<T extends Partial<WithAlias>>(data: Data<T>): string[] {
  const customArgs = Object.keys(args).filter((key) => !options.includes(key));

  return Object.entries(data)
    .map(([key, { alias }]) => {
      if (alias != null) {
        return Array.isArray(alias) ? [key, ...alias] : [key, alias];
      }
      return key;
    })
    .flat()
    .filter((nameOrAlias) => customArgs.includes(nameOrAlias));
}

const getDataArgs = {
  engine: function getEngineArgs(): string[] {
    const { engine } = args;
    const optionArg = engine as typeof engine | string[];
    const enginesData = getEnginesData();
    const customArgs = getCustomArgs(enginesData);
    return combineArgLists(optionArg, customArgs);
  },
  browser: function getBrowserArgs(): string[] {
    const { browser } = args;
    const optionArg = browser as typeof browser | string[];
    const browsersData = getBrowsersData();
    const customArgs = getCustomArgs(browsersData);
    return combineArgLists(optionArg, customArgs);
  },
  profile: function getProfileArgs(browserName: string): string[] {
    const { profile } = args;
    const optionArg = profile as typeof profile | string[];
    const profilesData = getProfilesData(browserName);
    const customArgs = getCustomArgs(profilesData);
    return combineArgLists(optionArg, customArgs);
  },
};

export default getDataArgs;
