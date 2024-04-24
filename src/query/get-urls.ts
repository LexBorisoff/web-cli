import { Engine } from "@lexjs/browser-search";
import { findResource } from "../helpers/find/find-resource.js";
import { queryArgs } from "../command/args/query-args.js";

const { _: keywords, ...options } = queryArgs;

export function getUrls([engineArg, engine]: [
  string,
  Engine<any, any>,
]): string[] {
  const handleResource = (resource: string): string[] => {
    const foundResource = findResource(engineArg, resource);
    return engine.resource(foundResource ?? resource, {
      path: keywords.map((k) => `${k}`),
      port: options.port,
      unsecureHttp: options.http,
    });
  };

  const { resource } = options;
  if (resource != null) {
    return Array.isArray(resource)
      ? resource.map((r) => handleResource(r)).flat()
      : handleResource(resource);
  }

  return engine.search(keywords.join(" "), {
    port: options.port,
    split: options.split,
    unsecureHttp: options.http,
  });
}
