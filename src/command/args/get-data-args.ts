import { options } from "../options.js";
import { getBrowsersData } from "../../data/get-browsers-data.js";
import { getEnginesData } from "../../data/get-engines-data.js";
import { getProfilesData } from "../../data/get-profiles-data.js";
import { configProfileFlags } from "../../data/config-flags.js";
import { orArray } from "../../utils/or-arrray.js";
import type { WithAlias } from "../../types/utility.js";
import { combineArgLists } from "./combine-arg-lists.js";
import { getQueryArgs } from "./get-query-args.js";

const args = getQueryArgs();
const browsersData = getBrowsersData();
const enginesData = getEnginesData();

interface Data<T> {
  [key: string]: T;
}

/**
 * Returns a unique list of non-nullable args
 */
function getUniqueList<Arg>(
  optionArg: Arg | NonNullable<Arg>[] | undefined,
  customArgs: Arg[],
  removeEmptyArg: boolean
): NonNullable<Arg>[] {
  const list = combineArgLists(optionArg, customArgs);
  const uniqueList = [...new Set(list)].filter(
    (arg): arg is NonNullable<Arg> => arg != null
  );
  return removeEmptyArg ? uniqueList.filter((arg) => arg !== "") : uniqueList;
}

/**
 * Returns a list of arg options supplied to the CLI that are
 * specific to config data and do not match standard args
 */
function getCustomArgs<T extends WithAlias>(data: Data<T>): string[] {
  const customFlags = Object.keys(args).filter((key) => !options.includes(key));
  return Object.entries(data)
    .map(([key, { alias }]) => {
      if (alias != null) {
        return Array.isArray(alias) ? [key, ...alias] : [key, alias];
      }
      return key;
    })
    .flat()
    .filter((nameOrAlias) => customFlags.includes(nameOrAlias));
}

export const getDataArgs = {
  /**
   * Returns a unique list of browser args provided to the CLI
   *
   * @param removeEmptyArg
   * If true, removes the empty value from the list
   */
  browser: function getBrowserArgs(removeEmptyArg = true): string[] {
    const optionArg = orArray(args.browser);
    const customArgs = getCustomArgs(browsersData);
    return getUniqueList(optionArg, customArgs, removeEmptyArg);
  },
  /**
   * Returns a unique list of profile args provided to the CLI.
   *
   * @param browserName
   * If value is provided, returns profile args for that browser name,
   * otherwise returns all profile args supplied to the CLI
   *
   * @param removeEmptyArg
   * If true, removes an empty arg value from the list
   */
  profile: function getProfileArgs(
    browserName?: string | null,
    removeEmptyArg = true
  ): string[] {
    const optionArg = orArray(args.profile);

    if (browserName == null) {
      const list: string[] = [];

      // push option arg values (--profile <name>) to the list
      if (optionArg != null) {
        list.push(...(Array.isArray(optionArg) ? optionArg : [optionArg]));
      }

      // push custom args (--profileName) to the list
      Object.keys(browsersData).forEach((arg) => {
        const profilesData = getProfilesData(arg);
        const customArgs = getCustomArgs(profilesData);

        // filter out short aliases
        const profileArgs = customArgs.filter((profileArg) =>
          configProfileFlags.includes(profileArg)
        );

        list.push(...profileArgs);
      });

      return [
        ...new Set(removeEmptyArg ? list.filter((arg) => arg !== "") : list),
      ];
    }

    const profilesData = getProfilesData(browserName);
    const customArgs = getCustomArgs(profilesData);

    // filter out short aliases
    const profileArgs = customArgs.filter((profileArg) =>
      configProfileFlags.includes(profileArg)
    );

    return getUniqueList(optionArg, profileArgs, removeEmptyArg);
  },
  /**
   * Returns a unique list of engine args provided to the CLI
   *
   * @param removeEmptyArg
   * If true, removes the empty value from the list
   */
  engine: function getEngineArgs(removeEmptyArg = true): string[] {
    const optionArg = orArray(args.engine);
    const customArgs = getCustomArgs(enginesData);
    return getUniqueList(optionArg, customArgs, removeEmptyArg);
  },
};
