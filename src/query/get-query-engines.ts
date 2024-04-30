import { Engine } from "@lexjs/browser-search";
import type { QueryEngine } from "../types/query.types.js";
import { getDataArgs } from "../command/args/get-data-args.js";
import { queryArgs } from "../command/args/query-args.js";
import { withUrlsOnly } from "../command/with.js";
import { getDefaultsData } from "../data/get-defaults-data.js";
import { findEngine } from "../helpers/find/find-engine.js";
import { defaultDelimiter } from "../helpers/config/defaults.js";

const { _: keywords } = queryArgs;
const defaults = getDefaultsData();
const [defaultEngineName, defaultEngine] = defaults.engine;
const engineArgs = getDataArgs.engine();

export function getQueryEngines(): QueryEngine[] {
  if (withUrlsOnly(keywords)) {
    return keywords.map((url) => [
      url,
      new Engine(url, {
        delimiter: defaultDelimiter,
      }),
    ]);
  }

  if (keywords.length === 0) {
    return [];
  }

  return engineArgs.length === 0
    ? [
        [
          defaultEngineName,
          new Engine(defaultEngine.baseUrl, {
            search: defaultEngine.search,
            delimiter: defaultEngine.delimiter,
            resources: defaultEngine.resources,
          }),
        ],
      ]
    : engineArgs.map((engineArg) => {
        const found = findEngine(engineArg);
        if (found == null) {
          // engine arg can be provided as a URL
          return [engineArg, new Engine(engineArg)];
        }

        const [engineName, engine] = found;
        return [
          engineName,
          new Engine(engine.baseUrl, {
            search: engine.search,
            delimiter: engine.delimiter,
            resources: engine.resources,
          }),
        ];
      });
}
