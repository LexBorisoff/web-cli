import query from "./query";
import getUrls from "./getUrls";
import { hasEngine, hasSearchQuery, hasWebsite, getArgs } from "../command";

const args = getArgs();

export default async function main() {
  // perform search query
  if (hasEngine() || hasSearchQuery() || hasWebsite()) {
    // single search engine / website to query
    if (!Array.isArray(args.engine)) {
      const urls = getUrls(args.engine);

      urls.forEach(async (url) => {
        await query(url);
      });
    }
    // multiple search engines / websites to query
    else {
      Object.values(args.engine).forEach(async (engineName) => {
        const urls = getUrls(engineName);

        if (!Array.isArray(urls)) {
          await query(urls);
        } else {
          urls.forEach(async (url) => {
            await query(url);
          });
        }
      });
    }
  }
  // open browser(s) without search query
  else {
    await query();
  }
}

console.log(args);
