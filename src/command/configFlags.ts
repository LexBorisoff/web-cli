import getBrowsersData from "../data/getBrowsersData";
import getProfilesData from "../data/getProfilesData";
import getEnginesData from "../data/getEnginesData";
import { WithAlias } from "../types/utility.types";

const browsersData = getBrowsersData();
const enginesData = getEnginesData();

interface Data<T> {
  [key: string]: T;
}

/**
 * Returns a flat array of names and aliases from config based on the provided config data
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

const browserFlags = getFlags(browsersData);
const profileFlags = Object.keys(browsersData)
  .map((browserName) => {
    const profilesData = getProfilesData(browserName);
    return getFlags(profilesData);
  })
  .flat();
const engineFlags = getFlags(enginesData);

/**
 * A list of identifiers (keys and aliases) from config data:
 * - browsers
 * - browser profiles
 * - engines
 */
const configFlags = [...browserFlags, ...profileFlags, ...engineFlags];
export default configFlags;
