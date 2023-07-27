import getEngine from "./getEngine";
import getWebsites from "./getWebsites";
import getSearchQuery from "./getSearchQuery";
import { getArgs, withSearchQuery, withURL } from "../../command";
import { getDefaultsData } from "../../data";
import { Engine } from "../../types/config.types";
import { printError } from "../print";

const args = getArgs();

const endsWithSlash = /\/$/;
const startsWithSlash = /^\//;

function removeLeadingSlash(str?: string): string {
  if (str == null) {
    return "";
  }

  return startsWithSlash.test(str) ? str.substring(1) : str;
}

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
  printError(`No engine "${engineNameOrAlias}" found in the config.`);
}

export default function getUrlList(engineNameOrAlias?: string): string[] {
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
    if (args.query) {
      queryOnly();
    } else if (engineNameOrAlias == null) {
      getWebsites().forEach((website) => {
        urlList.push(getFullUrl(website));
      });
    } else {
      const engine = getEngine(engineNameOrAlias);
      if (engine != null) {
        const engineQuery = getEngineQueryURL(engine);
        getWebsites().forEach((website) => {
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
