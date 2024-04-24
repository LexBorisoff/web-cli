import chalk from "chalk";
import { print, severity } from "../helpers/print/severity.js";
import { capitalize } from "../helpers/print/transform-text.js";
import { BrowserQuery } from "../types/browser-query.type.js";
import { queryArgs } from "../command/args/query-args.js";

const { incognito } = queryArgs;
const { info, success } = severity;

export function printQuery(
  urls: string[],
  browserQueries: BrowserQuery[]
): void {
  browserQueries.forEach((browserQuery) => {
    const { browser, profiles } = browserQuery;
    let browserInfo = info(capitalize(browser));

    if (profiles.length > 0) {
      browserInfo += ` (${chalk.gray(profiles.join(", "))})`;
    }

    if (incognito) {
      browserInfo += chalk.gray(" [private tab]");
    }

    print(browserInfo);
  });

  urls.forEach((url: string) => {
    print(`> ${success(url)}`);
  });
}
