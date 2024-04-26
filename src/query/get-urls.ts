import {
  Engine,
  ResourceConfig,
  ResourceObject,
  SearchConfig,
} from "@lexjs/browser-search";
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
    (engineResources = {}) => {
      // NOTE: resource object has a property key containing the splitter
      const foundResourceValue = findResourceByValue(engineResources);
      if (foundResourceValue != null) {
        return foundResourceValue;
      }

      const [resourceKey, pathKey] = splitResource();
      const foundPath =
        pathKey && findNested<string>(engineResources, pathKey, "");

      return foundPath == null
        ? resourceValue
        : findNested<string>(engineResources, resourceKey, resourceKey) ??
            resourceKey;
    },
    {
      path(engineResources = {}) {
        const path = keywords.map((k) => `${k}`);
        const foundResource = findResourceByValue(engineResources);

        // Relates to the NOTE in the above callback
        // Add path found by splitted path key only if resource does not include the splitter
        if (foundResource == null) {
          const [, pathKey] = splitResource();
          const foundPath =
            pathKey && findNested<string>(engineResources, pathKey, "");

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

export function getUrls(
  engine: Engine<SearchConfig, ResourceConfig>
): string[] {
  const { resource } = options;
  if (resource != null) {
    return Array.isArray(resource)
      ? resource.map((r) => handleResource(engine, r)).flat()
      : handleResource(engine, resource);
  }

  return engine.search(keywords.join(" "), {
    port: options.port,
    split: options.split,
    unsecureHttp: options.http,
  });
}
