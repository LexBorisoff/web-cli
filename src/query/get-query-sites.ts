import { Site } from '@api/site/site.js';
import { dataArgs } from '@command/args/data-args.js';
import { queryArgs, urlArgs } from '@command/args/query-args.js';
import { defaultsData } from '@data/defaults-data.js';
import { defaultDelimiter } from '@helpers/config/defaults.js';
import { findSite } from '@helpers/find/find-site.js';

import type { QuerySite } from '@app-types/query.types.js';

const [defaultSiteName, defaultSite] = defaultsData.site;
const siteArgs = dataArgs.site();
const delimiter = queryArgs.delimiter || defaultDelimiter;

export function getQuerySites(): QuerySite[] {
  // create engines based on provided site args
  if (siteArgs.length > 0) {
    return siteArgs.map((siteArg) => {
      const found = findSite(siteArg);
      if (found == null) {
        // site arg can be provided as a URL string
        const site = new Site(siteArg, { delimiter });
        return [siteArg, site];
      }

      const [engineName, site] = found;
      return [
        engineName,
        new Site(site.url, {
          search: site.search,
          delimiter: site.delimiter,
          resources: site.resources,
        }),
      ];
    });
  }

  // do no create engines when there are no value args
  if (queryArgs._.length === 0) {
    return [];
  }

  // create engines when all value args are URLs
  if (urlArgs != null) {
    return urlArgs.map((url) => [url, new Site(url, { delimiter })]);
  }

  // create default site
  return [
    [
      defaultSiteName,
      new Site(defaultSite.url, {
        search: defaultSite.search,
        delimiter: defaultSite.delimiter,
        resources: defaultSite.resources,
      }),
    ],
  ];
}
