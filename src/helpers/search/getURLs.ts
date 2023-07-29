import getEngine from "./getEngine";
import getSearchQuery from "./getSearchQuery";
import { urlPattern } from "../patterns";
import { getArgs, withSearchQuery, withURL } from "../../command";
import { getDefaultsData } from "../../data";
import { Engine } from "../../types/config.types";
import { printError } from "../print";

const args = getArgs();
const urlArgs = args._.map((arg) =>
  typeof arg === "string" ? arg : `${arg}`
).filter((arg) => urlPattern.test(arg));

const endsWithSlash = /\/$/;
const startsWithSlash = /^\//;

function removeLeadingSlash(str?: string): string {
  if (str == null) {
    return "";
  }

  return startsWithSlash.test(str) ? str.substring(1) : str;
}

/**
 * Returns the engine's "search" URL that can be used
 * to query the engine by adding the query string
 */
function getEngineQueryURL(engine: Engine): string {
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

function printNoEngine(engineNameOrAlias: string): void {
  if (engineNameOrAlias === "") {
    printError("Engine option must have a value");
    return;
  }
  printError(`Invalid engine: "${engineNameOrAlias}"`);
}

export default function getURLs(engineNameOrAlias?: string): string[] {
  const urlList: string[] = [];

  function getFullUrl(url: string): string {
    const protocol = `http${args.http ? "" : "s"}://`;
    return /^https?:\/\//is.test(url) ? url : `${protocol}${url}`;
  }

  function singleSearchQuery(): void {
    const defaults = getDefaultsData();
    const engine = getEngine(engineNameOrAlias ?? defaults.engine);

    if (engine != null) {
      const engineQuery = getEngineQueryURL(engine) + getSearchQuery(engine);
      urlList.push(getFullUrl(engineQuery));
    } else if (engineNameOrAlias != null) {
      printNoEngine(engineNameOrAlias);
    }
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
        urlList.push(getFullUrl(website));
      });
    }
    // search queries with URL args as part of the provided engine's query string
    else {
      const engine = getEngine(engineNameOrAlias);
      if (engine != null) {
        const engineQuery = getEngineQueryURL(engine);
        urlArgs.forEach((website) => {
          urlList.push(getFullUrl(engineQuery + website));
        });
      } else {
        printNoEngine(engineNameOrAlias);
      }
    }
  }
  // engine only
  else if (engineNameOrAlias != null) {
    const engine = getEngine(engineNameOrAlias);
    if (engine != null) {
      urlList.push(getFullUrl(engine.url));
    } else {
      printNoEngine(engineNameOrAlias);
    }
  }

  return urlList;
}
