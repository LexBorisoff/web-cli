import { Engine } from "@lexjs/browser-search";
import { findResource } from "../helpers/find/find-resource.js";
import { getQueryArgs } from "../command/args/get-query-args.js";
import { orArray } from "../helpers/utils/or-arrray.js";

const { _: keywords, ...options } = getQueryArgs();

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

  if (options.resource != null) {
    const resource = orArray(options.resource);
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
