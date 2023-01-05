import getWebsites from "./getWebsites";
import getSearchQuery from "./getSearchQuery";
import { getEngine } from "../helpers";
import { hasSearchQuery } from "../command";
import { defaults } from "../data";

export default function getUrls(
  engineName: string = defaults.engine
): string[] {
  let urls: string[] = [];

  const engine = getEngine(engineName);
  if (engine && hasSearchQuery()) {
    const queries: string[] = [];
    if (hasSearchQuery()) {
      const searchQuery = getSearchQuery(engine);
      const url = engine.url + engine.query + searchQuery;
      queries.push(url);
    } else {
      queries.push(engine.url);
    }

    if (queries.length > 0) {
      urls = [...queries];
    }
  }

  const websites = getWebsites();
  if (websites.length > 0) {
    urls = [...urls, ...websites];
  }

  return urls;
}
