import chalk from "chalk";
import queryBrowser from "./browser";
import { getUrlList } from "../helpers/search";
import { print, emptyLine } from "../helpers/print";
import { getArgs, getEngineArgs, getArgsList } from "../command";

const args = getArgs();

function handleEngine(engineNameOrAlias?: string): void {
  const urls = getUrlList(engineNameOrAlias);
  urls.forEach((url) => {
    print(`> ${chalk.green(url)}`);
    queryBrowser(url);
  });
}

export default function queryEngine(): void {
  const engineArgs = args.engine as typeof args.engine | string[];
  const customArgs = getEngineArgs();
  const list = getArgsList(engineArgs, customArgs);

  if (list.length > 0) {
    list.forEach((engineNameOrAlias) => {
      handleEngine(engineNameOrAlias);
    });
  } else {
    handleEngine();
  }

  emptyLine();
}
