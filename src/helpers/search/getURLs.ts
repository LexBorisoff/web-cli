import getEngine from "./getEngine";
import { urlPattern } from "../patterns";
import { withEngine, withSearchQuery, withURL } from "../../command";
import { getQueryArgs, getDataArgs } from "../../command/args";
import { getDefaultsData } from "../../data";
import { Engine } from "../../types/config.types";

const args = getQueryArgs();
const urlArgs = args._.map((arg) =>
  typeof arg === "string" ? arg : `${arg}`
).filter((arg) => urlPattern.test(arg));
const defaults = getDefaultsData();
const trailingSlash = /\/$/;
const leadingSlash = /^\//;

function removeLeadingSlash(str?: string): string {
  if (str == null) {
    return "";
  }

  return leadingSlash.test(str) ? str.substring(1) : str;
}

/**
 * Returns the provided engine's base URL
 * with a trailing forward slash
 */
function getEngineBaseURL(engine: Engine): string {
  return trailingSlash.test(engine.url) ? engine.url : `${engine.url}/`;
}

/**
 * Returns the provided engine's URL that can be used
 * to query it by adding the query string
 */
function getEngineQueryURL(engine: Engine): string {
  let engineQuery = "";
  if (args.package && engine.package != null) {
    engineQuery = removeLeadingSlash(engine.package);
  } else if (engine.query != null) {
    engineQuery = removeLeadingSlash(engine.query);
  }

  return getEngineBaseURL(engine) + engineQuery;
}

function getEngineRoute(engine: Engine, route: string): string {
  const found = Object.entries(engine.routes ?? {}).find(
    ([key]) => key === route
  );

  if (found != null) {
    const [, route] = found;
    return getEngineBaseURL(engine) + route;
  }

  return getEngineBaseURL(engine) + route;
}

/**
 * Returns a list of constructed URLs based on the engine
 *
 * @param engineNameOrAlias
 * if not provided, the default engine will be used
 */
function constructURLs(engineNameOrAlias?: string): string[] {
  const urls: string[] = [];
  const [, engine] = getEngine(engineNameOrAlias ?? defaults.engine) ?? [];

  function getFullURL(url: string): string {
    const protocol = `http${args.http ? "" : "s"}://`;
    return /^https?:\/\//is.test(url) ? url : `${protocol}${url}`;
  }

  function singleSearchQuery(): void {
    if (engine == null) {
      return;
    }

    if (args.route) {
      args._.forEach((route) => {
        const routeURL = getEngineRoute(engine, route.toString());
        urls.push(getFullURL(routeURL));
      });
      return;
    }

    if (args.split) {
      args._.forEach((value) => {
        const engineQuery = getEngineQueryURL(engine) + value;
        urls.push(getFullURL(engineQuery));
      });
      return;
    }

    const delimiter = engine.delimiter ?? defaults.delimiter;
    const searchQuery = args._.join(delimiter);
    const engineQuery = getEngineQueryURL(engine) + searchQuery;
    urls.push(getFullURL(engineQuery));
  }

  // search query
  if (withSearchQuery) {
    singleSearchQuery();
  }
  // URL
  else if (withURL) {
    // single search query with URL args as part of the query string
    if (args.query) {
      singleSearchQuery();
    }
    // full URLs based on the provided URL args
    else if (engineNameOrAlias == null) {
      urlArgs.forEach((website) => {
        urls.push(getFullURL(website));
      });
    }
    // search engine queries with URL args as part of the query string
    else {
      const [, engine] = getEngine(engineNameOrAlias) ?? [];
      if (engine != null) {
        const engineQuery = getEngineQueryURL(engine);
        urlArgs.forEach((website) => {
          urls.push(getFullURL(engineQuery + website));
        });
      }
    }
  }
  // engine only
  else if (engineNameOrAlias != null && args.route == null) {
    const [, engine] = getEngine(engineNameOrAlias) ?? [];
    if (engine != null) {
      urls.push(getFullURL(engine.url));
    }
  }

  return urls;
}

/**
 * Returns a list of URLs based on the CLI args and options
 */
export default function getURLs(): string[] {
  const urls: string[] = [];
  const engineArgs = getDataArgs.engine();

  if (withEngine || withSearchQuery || withURL) {
    if (engineArgs.length > 0) {
      engineArgs.forEach((engineNameOrAlias) => {
        urls.push(...constructURLs(engineNameOrAlias));
      });
    } else {
      urls.push(...constructURLs());
    }
  }

  return urls;
}
