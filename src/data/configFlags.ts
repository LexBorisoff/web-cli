import getBrowsersData from "./getBrowsersData";
import getProfilesData from "./getProfilesData";
import getEnginesData from "./getEnginesData";
import { WithAlias } from "../types/utility.types";

const browsersData = getBrowsersData();
const enginesData = getEnginesData();

interface Data<T> {
  [key: string]: T;
}

/**
 * Returns a flat array of names and aliases from the config
 * based on the provided config data
 */
function getFlags<T extends Partial<WithAlias>>(data: Data<T>): string[] {
  return Object.entries(data)
    .map(([key, { alias }]) => {
      if (alias != null) {
        return Array.isArray(alias) ? [key, ...alias] : [key, alias];
      }
      return key;
    })
    .flat();
}

export const browserFlags = getFlags(browsersData);

type BrowserProfileFlags = Record<string, string[]>;
export const browserProfileFlags: BrowserProfileFlags = {};

export const profileFlags = Object.keys(browsersData)
  .map((browserName) => {
    const profilesData = getProfilesData(browserName);
    const flags = getFlags(profilesData);
    browserProfileFlags[browserName] = flags;
    return flags;
  })
  .flat();

export const engineFlags = getFlags(enginesData);

/**
 * A list of identifiers (keys and aliases) from config data:
 * - browsers
 * - browser profiles
 * - engines
 */
const configFlags = [...browserFlags, ...profileFlags, ...engineFlags];
export default configFlags;
