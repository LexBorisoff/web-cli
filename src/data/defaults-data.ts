import {
  defaultSite,
  defaultDelimiter as delimiter,
} from '@helpers/config/defaults.js';
import { initialSites } from '@helpers/config/initial-engines.js';

import { getBrowsersData } from './get-browsers-data.js';
import { getSitesData } from './get-engines-data.js';
import { getProfilesData } from './get-profiles-data.js';

import type {
  ConfigSite,
  DefaultsData,
  WithDefault,
} from '@app-types/config.types.js';

function getDefault<Data extends WithDefault>(
  data: Data,
): [string, Data[keyof Data]] | null {
  const withDefault = Object.entries(data).find(
    ([, item]: [key: string, item: Data]) => !!item.isDefault,
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
  const sites = getSitesData();
  const fallback: [string, ConfigSite] = [
    defaultSite,
    initialSites[defaultSite],
  ];
  return getDefault(sites) ?? fallback;
}

function getDefaultBrowser(): DefaultsData['browser'] | null {
  const browsers = getBrowsersData();
  return getDefault(browsers);
}

const getDefaultProfile: DefaultsData['profile'] = (browserName) => {
  const profiles = getProfilesData(browserName);
  return getDefault(profiles);
};

export const defaultsData: DefaultsData = {
  delimiter,
  site: getDefaultSite(),
  browser: getDefaultBrowser(),
  profile: getDefaultProfile,
};
