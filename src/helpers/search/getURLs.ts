import chalk from "chalk";
import getEngine from "./getEngine";
import { urlPattern } from "../patterns";
import { emptyLine, printWarning, printError } from "../print";
import { withEngine, withRoute, withValues, withURL } from "../../command/with";
import { getQueryArgs, getDataArgs } from "../../command/args";
import { orArray } from "../../command/args/utils";
import { getDefaultsData } from "../../data";
import { Engine } from "../../types/config.types";
import { Arg } from "../../types/utility.types";

const args = getQueryArgs();
const urlArgs = args._.map((arg) =>
  typeof arg === "string" ? arg : `${arg}`
).filter((arg) => urlPattern.test(arg));

const defaults = getDefaultsData();
const noQueryEngines: string[] = [];

const trailingSlash = /\/$/;
const leadingSlash = /^\//;

function removeLeadingSlash(value: string): string {
  return leadingSlash.test(value) ? value.substring(1) : value;
}

function addTrailingSlash(value: string): string {
  return trailingSlash.test(value) ? value : `${value}/`;
}

/**
 * Returns the provided engine's base URL
 * with a trailing forward slash
 */
function getEngineBaseURL(engine: Engine): string {
  return addTrailingSlash(engine.url);
}

/**
 * Returns the provided engine's URL that can be used
 * to query it by adding the search values
 */
function getEngineQueryURL(engine: Engine, searchQuery: string): string {
  const baseURL = getEngineBaseURL(engine);

  if (engine.query != null) {
    const engineQuery = removeLeadingSlash(engine.query);
    return baseURL + engineQuery + searchQuery;
  }

  noQueryEngines.push(engine.name);
  return baseURL;
}

/**
 * Returns the provided engine's route URL
 *
 * @param routeArg
 * if it refers to a route in the engine's config, then the URL is built
 * using the config's route value, otherwise the argument itself is used
 * to create the URL
 */
function getEngineRouteURL(engine: Engine, routeArg: string): string {
  const found = Object.entries(engine.routes ?? {}).find(
    ([key]) => key === routeArg
  );

  if (found != null) {
    const [, route] = found;
    return getEngineBaseURL(engine) + route;
  }

  return getEngineBaseURL(engine) + routeArg;
}

/**
 * Returns a list of constructed URLs based on the engine
 *
 * @param engineNameOrAlias
 * if not provided, the default engine will be used
 */
function createURLs(engineNameOrAlias?: string): string[] {
  const urls: string[] = [];
  const [, engine] = getEngine(engineNameOrAlias ?? defaults.engine) ?? [];

  function getFullURL(url: string): string {
    const protocol = `http${args.http ? "" : "s"}://`;
    return /^https?:\/\//is.test(url) ? url : `${protocol}${url}`;
  }

  /**
   * Constructs simple search query URLs
   */
  function searchQuery(): void {
    if (engine == null) {
      return;
    }

    if (args.split) {
      args._.forEach((value) => {
        const engineQuery = getEngineQueryURL(engine, value.toString());
        urls.push(getFullURL(engineQuery));
      });
      return;
    }

    const delimiter = engine.delimiter ?? defaults.delimiter;
    const searchQuery = args._.join(delimiter);
    const engineQuery = getEngineQueryURL(engine, searchQuery);
    urls.push(getFullURL(engineQuery));
  }

  /**
   * Constructs engine route URLs
   *
   * @param arg
   * if provided, it is added to the URL after a forward-slash
   */
  function engineRouteQuery(arg?: Arg) {
    function createRoute(route: string) {
      if (engine == null) {
        return;
      }

      const engineRoute = getEngineRouteURL(engine, route);
      const routeURL =
        arg != null
          ? addTrailingSlash(engineRoute) + arg.toString()
          : engineRoute;

      urls.push(getFullURL(routeURL));
    }

    const route = orArray(args.route);

    if (Array.isArray(route)) {
      route
        .filter((r) => r !== "")
        .forEach((r) => {
          createRoute(r);
        });
    } else if (route != null) {
      createRoute(route);
    }
  }

  // routes
  if (withRoute) {
    // query engine routes
    if (args._.length > 0) {
      args._.forEach((arg) => {
        engineRouteQuery(arg);
      });
    }
    // access engine routes
    else {
      engineRouteQuery();
    }
  }
  // search query
  else if (withValues) {
    searchQuery();
  }
  // URL
  else if (withURL) {
    // single search query with URL args as part of the search query
    if (args.join) {
      searchQuery();
    }
    // full URLs based on the provided URL args
    else if (engineNameOrAlias == null) {
      urlArgs.forEach((website) => {
        urls.push(getFullURL(website));
      });
    }
    // search engine queries with URL args as part of the search query
    else {
      const [, engine] = getEngine(engineNameOrAlias) ?? [];
      if (engine != null) {
        urlArgs.forEach((website) => {
          const engineQuery = getEngineQueryURL(engine, website);
          urls.push(getFullURL(engineQuery));
        });
      }
    }
  }
  // engine only
  else if (engineNameOrAlias != null) {
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

  if (withEngine || withValues || withURL) {
    if (engineArgs.length > 0) {
      engineArgs.forEach((engineNameOrAlias) => {
        urls.push(...createURLs(engineNameOrAlias));
      });
    } else {
      urls.push(...createURLs());
    }
  }

  if (noQueryEngines.length > 0) {
    printWarning(`Engines with no ${chalk.italic.bold("query")} options:`);
    printError(noQueryEngines.join(", "));
    emptyLine();
  }

  return urls;
}
