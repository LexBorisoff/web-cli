import getEngine from "./getEngine";
import getWebsites from "./getWebsites";
import getSearchQuery from "./getSearchQuery";
import { getArgs, hasSearchQuery, hasWebsite } from "../../command";
import { engineFallback } from "../../data";
import { Engine } from "../../types/engines.types";

const args = getArgs();

const endsWithSlash = /\/$/;
const startsWithSlash = /^\//;

function removeLeadingSlash(str?: string): string {
  if (str == null) {
    return "";
  }

  return startsWithSlash.test(str) ? str.substring(1) : str;
}

async function getEngineQuery(engine: Engine): Promise<string> {
  const engineUrl: string = endsWithSlash.test(engine.url)
    ? engine.url
    : `${engine.url}/`;

  const engineQuery =
    args.package && engine.package != null
      ? removeLeadingSlash(engine.package)
      : removeLeadingSlash(engine.query);

  return engineUrl + engineQuery;
}

export default async function getUrlList(
  engineNameOrAlias?: string
): Promise<string[]> {
  const urlList: string[] = [];

  // search query or website is provided
  if (hasSearchQuery || hasWebsite) {
    if (hasSearchQuery) {
      const engine = await getEngine(engineNameOrAlias ?? engineFallback);
      if (engine != null) {
        const searchQuery: string = await getSearchQuery(engine);
        const engineQuery = await getEngineQuery(engine);
        urlList.push(engineQuery + searchQuery);
      }
    }

    if (hasWebsite) {
      if (engineNameOrAlias == null) {
        const websites = getWebsites();
        websites.forEach((website) => {
          urlList.push(website);
        });
      } else {
        const engine = await getEngine(engineNameOrAlias);
        if (engine != null) {
          const engineQuery = await getEngineQuery(engine);
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
    const engine = await getEngine(engineNameOrAlias);
    if (engine != null) {
      urlList.push(engine.url);
    }
  }

  return urlList;
}
