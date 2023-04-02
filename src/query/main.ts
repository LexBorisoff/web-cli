import query from "./query";
import chalk from "chalk";
import getUrlList from "../helpers/getUrlList";
import { getArgs, hasEngine, hasSearchQuery, hasWebsite } from "../command";

const args = getArgs();

async function queryEngine(engineNameOrAlias: string) {
  const urls = await getUrlList(engineNameOrAlias);
  urls.forEach(async (url) => {
    console.log(`> ${chalk.green(url)}`);
    await query(url);
  });
}

export default async function main() {
  // perform search query
  if (hasEngine() || hasSearchQuery() || hasWebsite()) {
    // single search engine / website to query
    if (!Array.isArray(args.engine)) {
      queryEngine(args.engine as string);
    }
    // multiple search engines / websites to query
    else {
      Object.values(args.engine).forEach(async (engineNameFromArgs) => {
        queryEngine(engineNameFromArgs);
      });
    }
  }
  // open browser(s) without search query
  else {
    await query();
  }
}
