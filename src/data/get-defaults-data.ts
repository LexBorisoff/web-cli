import { getBrowsersData } from "./get-browsers-data.js";
import { getProfilesData } from "./get-profiles-data.js";
import { getEnginesData } from "./get-engines-data.js";
import {
  defaultEngine,
  defaultDelimiter as delimiter,
  initialEngines,
} from "../helpers/config/index.js";
import type { DefaultsData, Engine } from "../types/config.js";
import type { IsDefault } from "../types/utility.js";
import { at } from "../utils/index.js";

function getDefault<Data extends IsDefault>(
  data: Data
): [string, Data[keyof Data]] | null {
  const withDefault = Object.entries(data).find(
    ([, item]: [key: string, item: Data]) => !!item.isDefault
  );

  if (withDefault != null) {
    return withDefault;
  }

  const first = at(Object.entries(data), 0);
  if (first != null) {
    return first;
  }

  return null;
}

function getDefaultEngine(): DefaultsData["engine"] {
  const engines = getEnginesData();
  const fallback: [string, Engine] = [
    defaultEngine,
    initialEngines[defaultEngine],
  ];
  return getDefault(engines) ?? fallback;
}

function getDefaultBrowser(): DefaultsData["browser"] {
  const browsers = getBrowsersData();
  return getDefault(browsers);
}

const getDefaultProfile: DefaultsData["profile"] = (browserName) => {
  const profiles = getProfilesData(browserName);
  return getDefault(profiles);
};

export function getDefaultsData(): DefaultsData {
  return {
    delimiter,
    engine: getDefaultEngine(),
    browser: getDefaultBrowser(),
    profile: getDefaultProfile,
  };
}
