import type { Browser } from '@api/browser/browser.js';
import type { Site } from '@api/site/site.js';

export interface BrowserProfileQuery {
  browser: string;
  profiles: string[];
}

export type QueryBrowser = [string, Browser<string, any>];
export type QuerySite = [string, Site<any, any>];
