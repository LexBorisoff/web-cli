import chalk from "chalk";
import queryBrowser from "./browser";
import { getURLs } from "../helpers/search";
import { print, emptyLine } from "../helpers/print";
import { getEngineArgs } from "../command";

function handleEngine(engineNameOrAlias?: string): void {
  const urls = getURLs(engineNameOrAlias);
  urls.forEach((url) => {
    print(`> ${chalk.green(url)}`);
    queryBrowser(url);
  });
}

export default function queryEngine(): void {
  const engineArgs = getEngineArgs();

  if (engineArgs.length > 0) {
    engineArgs.forEach((engineNameOrAlias) => {
      handleEngine(engineNameOrAlias);
    });
  } else {
    handleEngine();
  }

  emptyLine();
}
