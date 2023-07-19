import getEngine from "./getEngine";
import getWebsites from "./getWebsites";
import getSearchQuery from "./getSearchQuery";
import { getArgs, withSearchQuery, withWebsite } from "../../command";
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

  function getFullUrl(url: string) {
    const protocol = `http${args.http || !args.https ? "" : "s"}://`;
    return /^https?:\/\//is.test(url) ? url : `${protocol}${url}`;
  }

  // search query or website is provided
  if (withSearchQuery || withWebsite) {
    if (withSearchQuery) {
      const defaults = getDefaultsData();
      const engine = getEngine(engineNameOrAlias ?? defaults.engine);
      if (engineNameOrAlias != null && engine == null) {
        printNoEngine(engineNameOrAlias);
      }

      if (engine != null) {
        const searchQuery: string = getSearchQuery(engine);
        const engineQuery = getEngineQuery(engine);
        urlList.push(getFullUrl(engineQuery + searchQuery));
      }
    }

    if (withWebsite) {
      if (engineNameOrAlias == null) {
        const websites = getWebsites();
        websites.forEach((website) => {
          urlList.push(getFullUrl(website));
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
            urlList.push(getFullUrl(engineQuery + website));
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
      urlList.push(getFullUrl(engine.url));
    }
  }

  return urlList;
}
