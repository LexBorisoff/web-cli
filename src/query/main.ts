import query from "./query";
import chalk from "chalk";
import { getUrlList } from "../helpers/search";
import { getArgs, hasEngine, hasSearchQuery, hasWebsite } from "../command";

const args = getArgs();

async function queryEngine(engineNameOrAlias?: string): Promise<void> {
  const urls = await getUrlList(engineNameOrAlias);
  urls.forEach(async (url) => {
    console.log(`> ${chalk.green(url)}`);
    await query(url);
  });
}

export default async function main(): Promise<void> {
  const { engine } = args;

  // perform search query
  if (hasEngine || hasSearchQuery || hasWebsite) {
    // single search engine / website to query
    if (!Array.isArray(engine)) {
      queryEngine(engine);
    }
    // multiple search engines / websites to query
    else {
      Object.values(engine).forEach(async (engineNameFromArgs) => {
        queryEngine(engineNameFromArgs);
      });
    }
  }
  // open browser(s) without search query
  else {
    await query();
  }
}
