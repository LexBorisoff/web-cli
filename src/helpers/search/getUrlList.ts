import getEngine from "./getEngine";
import getWebsites from "./getWebsites";
import getSearchQuery from "./getSearchQuery";
import { getArgs, withSearchQuery, withWebsite } from "../../command";
import { engineFallback } from "../../data";
import { Engine } from "../../types/engine.types";
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

function getEngineQuery(engine: Engine): string {
  const engineUrl: string = endsWithSlash.test(engine.url)
    ? engine.url
    : `${engine.url}/`;

  const engineQuery =
    args.package && engine.package != null
      ? removeLeadingSlash(engine.package)
      : removeLeadingSlash(engine.query);

  return engineUrl + engineQuery;
}

function printNoEngine(engineNameOrAlias: string) {
  printError(`Engine with identifier "${engineNameOrAlias}" does not exist.`);
}

export default function getUrlList(engineNameOrAlias?: string): string[] {
  const urlList: string[] = [];

  // search query or website is provided
  if (withSearchQuery || withWebsite) {
    if (withSearchQuery) {
      const engine = getEngine(engineNameOrAlias ?? engineFallback);
      if (engineNameOrAlias != null && engine == null) {
        printNoEngine(engineNameOrAlias);
      }

      if (engine != null) {
        const searchQuery: string = getSearchQuery(engine);
        const engineQuery = getEngineQuery(engine);
        urlList.push(engineQuery + searchQuery);
      }
    }

    if (withWebsite) {
      if (engineNameOrAlias == null) {
        const websites = getWebsites();
        websites.forEach((website) => {
          urlList.push(website);
        });
      } else {
        const engine = getEngine(engineNameOrAlias);
        if (engine == null) {
          printNoEngine(engineNameOrAlias);
        }

        if (engine != null) {
          const engineQuery = getEngineQuery(engine);
          const websites = getWebsites();

          websites.forEach((website) => {
            urlList.push(engineQuery + website);
          });
        }
      }
    }
  }
  // only engine is provided
  else if (engineNameOrAlias != null) {
    const engine = getEngine(engineNameOrAlias);
    if (engine == null) {
      printNoEngine(engineNameOrAlias);
    }

    if (engine != null) {
      urlList.push(engine.url);
    }
  }

  return urlList;
}
