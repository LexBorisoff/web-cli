import { initialSites } from '@helpers/config/initial-engines.js';

import { getConfigData } from './get-config-data.js';

import type { ConfigDataJson } from '@app-types/config.types.js';

export function getSitesData(): NonNullable<ConfigDataJson['engines']> {
  const configData = getConfigData().engines ?? {};
  return Object.keys(configData).length > 0 ? configData : initialSites;
}
