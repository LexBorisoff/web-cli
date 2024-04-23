import { Browser, Engine, ProfilesConfig } from "@lexjs/browser-search";
import { getDataArgs } from "./command/args/get-data-args.js";
import { getQueryArgs } from "./command/args/get-query-args.js";
import { validateArgs } from "./command/args/validate-args.js";
import { getDefaultsData } from "./data/get-defaults-data.js";
import { findEngine } from "./helpers/find/find-engine.js";
import { print, severity } from "./helpers/print/severity.js";
import { orArray } from "./helpers/utils/or-arrray.js";
import { findResource } from "./helpers/find/find-resource.js";
import { findBrowser } from "./helpers/find/find-browser.js";
import { getBrowserName } from "./helpers/browser/get-browser-name.js";

const { _: keywords, ...options } = getQueryArgs();

const defaults = getDefaultsData();
const [defaultEngineName, defaultEngine] = defaults.engine;
const browserArgs = getDataArgs.browser();
const engineArgs = getDataArgs.engine();
const { info, success, error, warning } = severity;

function getUrls([engineArg, engine]: [string, Engine<any, any>]) {
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

export function main() {
  const errors = validateArgs();
  if (errors.length > 0) {
    errors.forEach((message) => {
      print(message);
    });
    return;
  }

  const browsers = browserArgs.map((browserNameOrAlias) => {
    const browserName = getBrowserName(browserNameOrAlias);
    const [, found] = findBrowser(browserNameOrAlias) ?? [];

    const profiles: ProfilesConfig | undefined =
      found == null
        ? undefined
        : Object.entries(found.profiles ?? {}).reduce<ProfilesConfig>(
            (result, [key, profile]) => ({
              ...result,
              [key]: typeof profile === "string" ? profile : profile.directory,
            }),
            {}
          );

    return new Browser(browserName, {
      profiles,
    });
  });

  if (engineArgs.length === 0) {
    const engine = new Engine(defaultEngine.baseUrl, {
      search: defaultEngine.search,
      delimiter: defaultEngine.delimiter,
      resources: defaultEngine.resources,
    });

    const urls = getUrls([defaultEngineName, engine]);
    console.log(urls);

    return;
  }

  const engines: [string, Engine<any, any>][] =
    engineArgs.length === 0
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

  // urls
  const urls: string[] = engines.map((engine) => getUrls(engine)).flat();
}
