import chalk from "chalk";
import queryBrowser from "./browser";
import { getUrlList } from "../helpers/search";
import { emptyLine } from "../helpers/print";
import { getArgs } from "../command";

const args = getArgs();

function handleEngine(engineNameOrAlias?: string): void {
  const urls = getUrlList(engineNameOrAlias);
  urls.forEach((url) => {
    console.log(`> ${chalk.green(url)}`);
    queryBrowser(url);
  });
}

export default function queryEngine(): void {
  const engineArg = args.engine as typeof args.engine | string[];

  // single search engine / website to query
  if (!Array.isArray(engineArg)) {
    handleEngine(engineArg);
  }
  // multiple search engines / websites to query
  else {
    Object.values(engineArg).forEach((arg) => {
      handleEngine(arg);
    });
  }

  emptyLine();
}
