import type { SitesData } from '@app-types/config.types.js';

export const initialSites: NonNullable<SitesData> = {
  google: {
    url: 'google.com',
    search: 'search?q=',
  },
  duckduckgo: {
    url: 'duckduckgo.com',
    search: '?q=',
    delimiter: '+',
    alias: ['duck'],
  },
  github: {
    url: 'github.com',
    search: 'search?q=',
    resources: {
      tabs: {
        stars: '?tab=stars',
        repos: '?tab=repositories',
        projects: '?tab=projects',
      },
    },
  },
  mdn: {
    url: 'developer.mozilla.org',
    search: 'search?q=',
  },
  npm: {
    url: 'npmjs.com',
    search: 'search?q=',
  },
  youtube: {
    url: 'youtube.com',
    search: 'results?search_query=',
    delimiter: '+',
  },
};
