import chalk from "chalk";
import getEngine from "./getEngine";
import { emptyLine, printWarning, printError } from "../print";
import {
  withEngine,
  withRoute,
  withAddress,
  withKeywords,
  withURLsOnly,
} from "../../command/with";
import { getQueryArgs, getDataArgs } from "../../command/args";
import { getDefaultsData } from "../../data";
import { urlPattern, orArray } from "../../utilities";
import type { Engine } from "../../types/config";
import type { Arg } from "../../types/utility";

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
function getEngineQueryURL(engine: Engine, queryValues: string): string {
  const baseURL = getEngineBaseURL(engine);

  if (engine.query != null) {
    const queryString = removeLeadingSlash(engine.query);
    return baseURL + queryString + queryValues;
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
 * Returns the full URL including the protocol
 */
function getFullURL(url: string): string {
  const protocol = `http${args.http ? "" : "s"}://`;
  return /^https?:\/\//is.test(url) ? url : `${protocol}${url}`;
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

  /**
   * Constructs simple search query URLs
   */
  function searchQuery(values: string[]): void {
    if (engine == null) {
      return;
    }

    if (args.split) {
      if (engine.query == null) {
        const queryURL = getEngineBaseURL(engine);
        urls.push(getFullURL(queryURL));

        if (values.length > 0) {
          noQueryEngines.push(engine.name);
        }
      } else {
        values.forEach((value) => {
          const queryURL = getEngineQueryURL(engine, value.toString());
          urls.push(getFullURL(queryURL));
        });
      }
      return;
    }

    const delimiter = engine.delimiter ?? defaults.delimiter;
    const queryURL = getEngineQueryURL(engine, values.join(delimiter));
    urls.push(getFullURL(queryURL));
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
  else if (withKeywords) {
    searchQuery(args._.map((arg) => arg.toString()));
  }
  // URL
  else if (withURLsOnly) {
    // search engine query with URLs as part of the search query
    if (engineNameOrAlias != null) {
      searchQuery(urlArgs);
    }
    // full URLs based on the provided URL args
    else {
      urlArgs.forEach((website) => {
        urls.push(getFullURL(website));
      });
    }
  }
  // engine only
  else if (engineNameOrAlias != null && engine != null) {
    urls.push(getFullURL(engine.url));
  }

  return urls;
}

/**
 * Returns a list of URLs based on the CLI args and options
 */
export default function getURLs(): string[] {
  const urls: string[] = [];
  const engineArgs = getDataArgs.engine();

  if (withAddress) {
    const address = orArray(args.address);

    if (Array.isArray(address)) {
      address
        .filter((a) => a !== "")
        .forEach((a) => {
          urls.push(getFullURL(a));
        });
    } else if (address != null && address !== "") {
      urls.push(getFullURL(address));
    }
  }

  if (withEngine || withKeywords || withURLsOnly) {
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
