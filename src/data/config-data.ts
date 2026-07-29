import { readConfig } from '@config/read-config.js';
import { initialSites } from '@data/initial-sites.js';

import type {
  BrowsersData,
  ProfilesData,
  SitesData,
} from '@app-types/config.types.js';

export const configData = readConfig();

export const sitesData: SitesData = { ...initialSites, ...configData.sites };

export const browsersData: BrowsersData = configData.browsers ?? {};

export function getProfilesData(browserName: string): ProfilesData {
  return Object.entries(
    browsersData[browserName]?.profiles ?? {},
  ).reduce<ProfilesData>(
    (result, [key, value]) =>
      ({
        ...result,
        [key]: typeof value === 'string' ? { directory: value } : value,
      }) satisfies ProfilesData,
    {},
  );
}
