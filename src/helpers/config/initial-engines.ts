import type { ConfigSite } from '@app-types/config.types.js';

export const initialSites: NonNullable<Record<string, ConfigSite>> = {
  google: {
    url: 'google.com',
    search: 'search?q=',
  },
  duck: {
    url: 'duckduckgo.com',
    search: '?q=',
    delimiter: '+',
    alias: ['duckduckgo'],
  },
  github: {
    url: 'github.com',
    search: 'search?q=',
    resources: {
      tabs: {
        repos: '?tab=repositories',
        projects: '?tab=projects',
        stars: '?tab=stars',
      },
    },
  },
  mdn: {
    url: 'developer.mozilla.org',
    search: 'search?q=',
  },
  youtube: {
    url: 'youtube.com',
    search: 'results?search_query=',
    delimiter: '+',
  },
  npm: {
    url: 'npmjs.com',
    search: 'search?q=',
  },
};
