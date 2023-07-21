import getBrowsersData from "./getBrowsersData";
import getBrowserProfiles from "./getBrowserProfiles";
import getEnginesData from "./getEnginesData";
import { WithAlias } from "../types/utility.types";

const browsersData = getBrowsersData();
const enginesData = getEnginesData();

interface Data<T> {
  [key: string]: T;
}

function getList<T extends Partial<WithAlias>>(data: Data<T>): string[] {
  return Object.entries(data)
    .map(([key, { alias }]) => {
      if (alias != null) {
        return Array.isArray(alias) ? [key, ...alias] : [key, alias];
      }
      return key;
    })
    .flat();
}

export function getBrowsersList(): string[] {
  return getList(browsersData);
}

export function getProfilesList(): string[] {
  return Object.keys(browsersData)
    .map((browserName) => {
      const profilesData = getBrowserProfiles(browserName);
      return getList(profilesData);
    })
    .flat();
}

export function getEnginesList() {
  return getList(enginesData);
}
