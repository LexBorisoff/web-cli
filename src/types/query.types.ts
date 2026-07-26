import type { Browser, Site } from '@api/index.js';

export interface BrowserProfileQuery {
  browser: string;
  profiles: string[];
}

export type QueryBrowser = [string, Browser<string, any>];
export type QuerySite = [string, Site<any, any>];
