import {
  Engine,
  ResourceConfig,
  ResourceObject,
  SearchConfig,
} from "@lexjs/web-search";
import { withUrlsOnly } from "../command/with.js";
import { queryArgs } from "../command/args/query-args.js";
import { findNested } from "../helpers/find/find-nested.js";

const { _: keywords, ...options } = queryArgs;

function handleResource(
  engine: Engine<SearchConfig, ResourceConfig>,
  resourceValue: string
): string[] {
  function splitResource(): [string, string | undefined] {
    const splitter = "::";
    const splitted = resourceValue.split(splitter);
    const resourceKey = splitted.at(0) ?? resourceValue;
    const pathKey = splitted.at(1);
    return [resourceKey, pathKey];
  }

  function findResourceByValue(resources: ResourceObject) {
    return findNested<string>(resources, resourceValue, resourceValue);
  }

  return engine.resource(
    (config = {}) => {
      // NOTE: resource object has a property key containing the splitter
      const foundResourceValue = findResourceByValue(config);
      if (foundResourceValue != null) {
        return foundResourceValue;
      }

      const [resourceKey, pathKey] = splitResource();
      const foundPath = pathKey && findNested<string>(config, pathKey, "");

      return foundPath == null
        ? resourceValue
        : findNested<string>(config, resourceKey, resourceKey) ?? resourceKey;
    },
    {
      path(config = {}) {
        const path = withUrlsOnly(keywords) ? [] : keywords.map((k) => `${k}`);
        const foundResource = findResourceByValue(config);

        // Relates to the NOTE in the above callback
        // Add path found by splitted path key only if resource does not include the splitter
        if (foundResource == null) {
          const [, pathKey] = splitResource();
          const foundPath = pathKey && findNested<string>(config, pathKey, "");

          if (foundPath != null) {
            path.push(foundPath);
          }
        }

        return path;
      },
      port: options.port,
      unsecureHttp: options.http,
    }
  );
}

function handleQuery(config: SearchConfig = { main: "/" }): string | string[] {
  function getQuery(query: string): string {
    return typeof config !== "string"
      ? findNested<string>(config, query, query) ?? query
      : query;
  }

  const { query } = options;

  if (query == null) {
    return typeof config === "string" ? config : config.main;
  }

  if (Array.isArray(query)) {
    return query.map((q) => getQuery(q));
  }

  return getQuery(query);
}

export function getUrls(
  engine: Engine<SearchConfig, ResourceConfig>
): string[] {
  const { resource } = options;
  if (resource != null) {
    return Array.isArray(resource)
      ? resource.map((r) => handleResource(engine, r)).flat()
      : handleResource(engine, resource);
  }

  return engine.search(withUrlsOnly(keywords) ? null : keywords.join(" "), {
    query: handleQuery,
    port: options.port,
    split: options.split,
    unsecureHttp: options.http,
  });
}
