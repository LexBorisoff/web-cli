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

  const engineQuery =
    args.package && engine.package != null
      ? removeLeadingSlash(engine.package)
      : removeLeadingSlash(engine.query);

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

  function queryOnly(): void {
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
    queryOnly();
  }
  // URL
  else if (withURL) {
    // query only (URL can be part of the whole search)
    if (args.query) {
      queryOnly();
    }
    // no engine is provided to the query the URL
    else if (engineNameOrAlias == null) {
      urlArgs.forEach((website) => {
        urlList.push(getFullUrl(website));
      });
    }
    //
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
  // only engine is provided
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
