import chalk from "chalk";
import queryBrowser from "./browser";
import { getUrlList } from "../helpers/search";
import { getArgs } from "../command";

const args = getArgs();

export default async function queryEngine(): Promise<void> {
  async function handleEngine(engineNameOrAlias?: string) {
    const urls = getUrlList(engineNameOrAlias);
    urls.forEach(async (url) => {
      console.log(`> ${chalk.green(url)}`);
      await queryBrowser(url);
    });
  }

  const engineArg = args.engine as typeof args.engine | string[];

  if (!Array.isArray(engineArg)) {
    await handleEngine(engineArg);
  }
  // multiple search engines / websites to query
  else {
    Object.values(engineArg).forEach(async (engineName) => {
      await handleEngine(engineName);
    });
  }
}
