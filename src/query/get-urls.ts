import { Engine } from "@lexjs/browser-search";
import { findResource } from "../helpers/find/find-resource.js";
import { queryArgs } from "../command/args/query-args.js";

const { _: keywords, ...options } = queryArgs;

interface ResourceStringProps {
  resource: string;
  affix: string;
}

function createResourceString({ resource, affix }: ResourceStringProps) {
  return `${affix}${
    affix === "" || resource.startsWith("?") ? "" : "/"
  }${resource}`;
}

export function getUrls([engineArg, engine]: [
  string,
  Engine<any, any>,
]): string[] {
  function createResourceUrls(resource: string): string[] {
    return engine.resource(resource, {
      path: keywords.map((k) => `${k}`),
      port: options.port,
      unsecureHttp: options.http,
    });
  }

  function handleResource(
    resourceValue: string | string[],
    affixValue = ""
  ): string[] {
    const affix = findResource(engineArg, affixValue) ?? affixValue;

    if (Array.isArray(resourceValue)) {
      return resourceValue
        .map((r) => {
          const resource = findResource(engineArg, r) ?? r;
          return createResourceUrls(createResourceString({ resource, affix }));
        })
        .flat();
    }

    const resource = findResource(engineArg, resourceValue) ?? resourceValue;
    return createResourceUrls(createResourceString({ resource, affix }));
  }

  const { resource, affix } = options;
  if (resource != null) {
    return Array.isArray(affix)
      ? affix.map((p) => handleResource(resource, p)).flat()
      : handleResource(resource, affix);
  }

  return engine.search(keywords.join(" "), {
    port: options.port,
    split: options.split,
    unsecureHttp: options.http,
  });
}
