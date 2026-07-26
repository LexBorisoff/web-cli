import { initialSites } from '@helpers/config/initial-sites.js';

import { readConfig } from './read-config.js';

import type {
  BrowsersData,
  ProfilesData,
  SitesData,
} from '@app-types/config.types.js';

export const configData = readConfig();

export const sitesData: SitesData =
  Object.keys(configData.sites).length > 0 ? configData.sites : initialSites;

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
