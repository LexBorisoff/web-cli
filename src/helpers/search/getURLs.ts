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
const endsWithSlash = /\/$/;
const startsWithSlash = /^\//;

function removeLeadingSlash(str?: string): string {
  if (str == null) {
    return "";
  }

  return startsWithSlash.test(str) ? str.substring(1) : str;
}

/**
 * Returns the provided engine's URL that can be used
 * to query it by adding the query string
 */
function getEngineURL(engine: Engine): string {
  const engineUrl: string = endsWithSlash.test(engine.url)
    ? engine.url
    : `${engine.url}/`;

  let engineQuery = "";
  if (args.package && engine.package != null) {
    engineQuery = removeLeadingSlash(engine.package);
  } else if (engine.query != null) {
    engineQuery = removeLeadingSlash(engine.query);
  }

  return engineUrl + engineQuery;
}

/**
 * Returns a list of constructed URLs based on the engine
 *
 * @param engineNameOrAlias
 * if not provided, the default engine will be used
 */
function constructURLs(engineNameOrAlias?: string): string[] {
  const urls: string[] = [];

  function getFullUrl(url: string): string {
    const protocol = `http${args.http ? "" : "s"}://`;
    return /^https?:\/\//is.test(url) ? url : `${protocol}${url}`;
  }

  function singleSearchQuery(): void {
    const [, engine] = getEngine(engineNameOrAlias ?? defaults.engine) ?? [];
    if (engine == null) {
      return;
    }

    if (args.split) {
      args._.forEach((value) => {
        const engineQuery = getEngineURL(engine) + value;
        urls.push(getFullUrl(engineQuery));
      });
      return;
    }

    const delimiter = engine.delimiter ?? defaults.delimiter;
    const searchQuery = args._.join(delimiter);
    const engineQuery = getEngineURL(engine) + searchQuery;
    urls.push(getFullUrl(engineQuery));
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
        urls.push(getFullUrl(website));
      });
    }
    // search engine queries with URL args as part of the query string
    else {
      const [, engine] = getEngine(engineNameOrAlias) ?? [];
      if (engine != null) {
        const engineQuery = getEngineURL(engine);
        urlArgs.forEach((website) => {
          urls.push(getFullUrl(engineQuery + website));
        });
      }
    }
  }
  // engine only
  else if (engineNameOrAlias != null) {
    const [, engine] = getEngine(engineNameOrAlias) ?? [];
    if (engine != null) {
      urls.push(getFullUrl(engine.url));
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
