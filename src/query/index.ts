import query from "./query";
import getUrl from "./getUrl";
import { getArgs } from "../command";
import { hasEngine, hasSearchQuery } from "../command";

const args = getArgs();

async function main() {
  // perform search query
  if (hasSearchQuery() || hasEngine()) {
    // single search engine / website to query
    if (!Array.isArray(args.engine)) {
      const url = getUrl(args.engine);
      await query(url);
    }
    // multiple search engines / websites to query
    else {
      Object.values(args.engine).forEach(async (engineName) => {
        const url = getUrl(engineName);
        await query(url);
      });
    }
  }
  // open browser(s) without search query
  else {
    await query();
  }
}

export default main;

console.log(args);
