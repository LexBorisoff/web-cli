import { readConfig } from '@config/read-config.js';
import { initialSites } from '@helpers/config/initial-sites.js';

import type { SitesData } from '@app-types/config.types.js';

export function getSitesData(): NonNullable<SitesData> {
  const configSites = readConfig().sites;
  return Object.keys(configSites).length > 0 ? configSites : initialSites;
}
