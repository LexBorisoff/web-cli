import query from "./query";
import getUrls from "./getUrls";
import { hasEngine, hasSearchQuery, hasWebsite, getArgs } from "../command";

const args = getArgs();

async function queryUrls(engineName: string) {
  const urls = getUrls(engineName);
  urls.forEach(async (url) => {
    await query(url);
  });
}

export default async function main() {
  // perform search query
  if (hasEngine() || hasSearchQuery() || hasWebsite()) {
    // single search engine / website to query
    if (!Array.isArray(args.engine)) {
      queryUrls(args.engine as string);
    }
    // multiple search engines / websites to query
    else {
      Object.values(args.engine).forEach(async (engineName) => {
        queryUrls(engineName);
      });
    }
  }
  // open browser(s) without search query
  else {
    await query();
  }
}

console.log(args);
