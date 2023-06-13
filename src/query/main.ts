import query from "./query";
import chalk from "chalk";
import { getUrlList } from "../helpers/search";
import { getArgs, withEngine, withSearchQuery, withWebsite } from "../command";

const args = getArgs();

async function queryEngine(engineNameOrAlias?: string): Promise<void> {
  const urls = getUrlList(engineNameOrAlias);
  urls.forEach(async (url) => {
    console.log(`> ${chalk.green(url)}`);
    await query(url);
  });
}

export default async function main(): Promise<void> {
  const { engine } = args;

  // perform search query
  if (withEngine || withSearchQuery || withWebsite) {
    // single search engine / website to query
    if (!Array.isArray(engine)) {
      await queryEngine(engine);
    }
    // multiple search engines / websites to query
    else {
      Object.values(engine).forEach(async (engineNameFromArgs) => {
        await queryEngine(engineNameFromArgs);
      });
    }
  }
  // open browser(s) without search query
  else {
    await query();
  }
}
