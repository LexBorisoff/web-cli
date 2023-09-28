import chalk from "chalk";
import queryBrowsers from "./queryBrowsers.js";
import { getQueryArgs, validateArgs } from "../command/args/index.js";
import { getURLs } from "../helpers/search/index.js";
import { print, severity, capitalize } from "../helpers/print/index.js";

const { incognito } = getQueryArgs();
const { info, success } = severity;

export default function query(): void {
  const errors = validateArgs();
  if (errors.length > 0) {
    errors.forEach((message) => {
      print(message);
    });
    return;
  }

  const urls = getURLs();
  const browserQueries = queryBrowsers(urls);

  browserQueries.forEach((browserQuery) => {
    const { browser, profiles } = browserQuery;
    let browserInfo = info(capitalize(browser));
    if (profiles.length > 0) {
      browserInfo += ` (${chalk.gray(profiles.join(", "))})${
        incognito ? chalk.gray(" [private tab]") : ""
      }`;
    }

    print(browserInfo);
  });

  urls.forEach((url) => {
    print(`> ${success(url)}`);
  });
}
