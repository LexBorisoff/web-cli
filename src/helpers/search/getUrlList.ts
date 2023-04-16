import getEngine from "./getEngine";
import getWebsites from "./getWebsites";
import getSearchQuery from "./getSearchQuery";
import { getArgs, hasSearchQuery } from "../../command";
import { engineFallback } from "../../data";

const args = getArgs();

const endsWithSlash = /\/$/;
const startsWithSlash = /^\//;

function removeLeadingSlash(str?: string): string {
  if (str == null) {
    return "";
  }

  return startsWithSlash.test(str) ? str.substring(1) : str;
}

export default async function getUrlList(
  engineNameOrAlias: string = engineFallback
): Promise<string[]> {
  let urlList: string[] = [];
  const engine = await getEngine(engineNameOrAlias);

  if (engine != null) {
    const queries: string[] = [];

    if (hasSearchQuery()) {
      const engineUrl: string = endsWithSlash.test(engine.url)
        ? engine.url
        : `${engine.url}/`;

      const engineQuery: string =
        args.package && engine.package != null
          ? removeLeadingSlash(engine.package)
          : removeLeadingSlash(engine.query);

      const searchQuery: string = await getSearchQuery(engine);

      const fullUrl: string = engineUrl + engineQuery + searchQuery;
      queries.push(fullUrl);
    } else {
      queries.push(engine.url);
    }

    if (queries.length > 0) {
      urlList = [...queries];
    }
  }

  const websites = getWebsites();
  if (websites.length > 0) {
    urlList = [...urlList, ...websites];
  }

  return urlList;
}
