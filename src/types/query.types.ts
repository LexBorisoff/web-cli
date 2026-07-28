import type { Browser } from '@api/browser/browser.js';
import type { ProfilesConfig } from '@api/browser/browser.types.js';
import type { Site } from '@api/site/site.js';
import type { ResourceConfig, SearchPathConfig } from '@api/site/site.types.js';

export interface BrowserProfileQuery {
  browser: string;
  profiles: string[];
}

export type QueryBrowser = [string, Browser<string, ProfilesConfig>];
export type QuerySite = [string, Site<SearchPathConfig, ResourceConfig>];
