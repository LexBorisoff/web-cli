import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { load } from 'js-yaml';

import type {
  BrowsersConfig,
  ConfigBrowser,
  ConfigData,
  ConfigSite,
  SitesConfig,
} from '@app-types/config.types.js';

function getConfigPath(configType: 'sites' | 'browsers'): string | undefined {
  const configPath = path.join(os.homedir(), '.search-web', 'config');
  return ['yml', 'yaml']
    .map((ext) => path.join(configPath, `${configType}.${ext}`))
    .find((filePath) => fs.existsSync(filePath));
}

function sortConfigData<
  T extends ConfigSite | ConfigBrowser,
  Config extends Record<string, T>,
>(config: Config): Config {
  const sortedKeys = Object.keys(config);
  sortedKeys.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const [defaultKey] =
    Object.entries(config).find(([_key, v]) => v?.isDefault) ?? [];

  const sortReducer = (acc: Config, key: string): Config => ({
    ...acc,
    [key]: config[key],
  });

  return defaultKey != null
    ? {
        [defaultKey]: config[defaultKey],
        ...sortedKeys
          .filter((key) => key.toLowerCase() !== defaultKey.toLowerCase())
          .reduce(sortReducer, {} as Config),
      }
    : sortedKeys.reduce(sortReducer, {} as Config);
}

export function readConfig(): ConfigData {
  const sitesConfigPath = getConfigPath('sites');
  const browsersConfigPath = getConfigPath('browsers');
  const config: ConfigData = { sites: {}, browsers: {} };

  if (sitesConfigPath != null) {
    const sitesConfigRaw = fs.readFileSync(sitesConfigPath, 'utf-8');
    const { $schema, ...sites } = load(sitesConfigRaw) as SitesConfig;
    config.sites = sortConfigData(sites);
  }

  if (browsersConfigPath != null) {
    const browsersConfigRaw = fs.readFileSync(browsersConfigPath, 'utf-8');
    const { $schema, ...browsers } = load(browsersConfigRaw) as BrowsersConfig;
    const sorted = sortConfigData(browsers);

    // cast null values as empty objects
    config.browsers = Object.entries(sorted).reduce((acc, [key, browser]) => {
      return { ...acc, [key]: browser === null ? {} : browser };
    }, sorted);
  }

  return config;
}
