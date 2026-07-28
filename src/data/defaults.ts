import { sitesData, browsersData, getProfilesData } from './config-data.js';
import { initialSites } from './initial-sites.js';

import type {
  ConfigSite,
  DefaultsData,
  WithDefault,
} from '@app-types/config.types.js';

export const [defaultSite] = Object.keys(initialSites);
export const defaultDelimiter = ' ';

function getDefault<Data extends WithDefault>(
  data: Data,
): [string, Data[keyof Data]] | null {
  const withDefault = Object.entries(data).find(
    ([, item]: [key: string, item: Data]) => !!item.default,
  );

  if (withDefault != null) {
    return withDefault;
  }

  const first = Object.entries(data).at(0);
  if (first != null) {
    return first;
  }

  return null;
}

function getDefaultSite(): DefaultsData['site'] {
  const fallback: [string, ConfigSite] = [
    defaultSite,
    initialSites[defaultSite],
  ];
  return getDefault(sitesData) ?? fallback;
}

function getDefaultBrowser(): DefaultsData['browser'] | null {
  return getDefault(browsersData);
}

const getDefaultProfile: DefaultsData['profile'] = (browserName) => {
  const profiles = getProfilesData(browserName);
  return getDefault(profiles);
};

export const defaultsData: DefaultsData = {
  delimiter: defaultDelimiter,
  site: getDefaultSite(),
  browser: getDefaultBrowser(),
  profile: getDefaultProfile,
};
