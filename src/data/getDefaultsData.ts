import getBrowsersData from "./getBrowsersData.js";
import getProfilesData from "./getProfilesData.js";
import getEnginesData from "./getEnginesData.js";
import {
  defaultEngine,
  defaultDelimiter as delimiter,
} from "../helpers/config/index.js";
import type { DefaultsData } from "../types/config.d.ts";
import type { IsDefault } from "../types/utility.d.ts";
import { at } from "../utilities/index.js";

function getDefault<Data extends IsDefault>(data: Data): string | null {
  const withDefault = Object.entries(data).find(
    ([, item]: [key: string, item: Data]) => !!item.isDefault
  );

  if (withDefault != null) {
    const [itemName] = withDefault;
    return itemName;
  }

  const first = at(Object.keys(data), 0);
  if (first != null) {
    return first;
  }

  return null;
}

function getDefaultEngine(): DefaultsData["engine"] {
  const engines = getEnginesData();
  return getDefault(engines) ?? defaultEngine;
}

function getDefaultBrowser(): DefaultsData["browser"] {
  const browsers = getBrowsersData();
  return getDefault(browsers);
}

const getDefaultProfile: DefaultsData["profile"] = (browserName) => {
  const profiles = getProfilesData(browserName);
  return getDefault(profiles);
};

export default function getDefaultsData(): DefaultsData {
  return {
    delimiter,
    engine: getDefaultEngine(),
    browser: getDefaultBrowser(),
    profile: getDefaultProfile,
  };
}
