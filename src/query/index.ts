import queryBrowsers from "./queryBrowsers";
import { validateArgs } from "../command/args";
import { getURLs } from "../helpers/search";
import { print, info, success, neutral, emptyLine } from "../helpers/print";
import { capitalize } from "../helpers/transformText";

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
      browserInfo += ` (${neutral(profiles.join(", "))})`;
    }

    print(browserInfo);
  });

  urls.forEach((url) => {
    print(`> ${success(url)}`);
  });

  emptyLine();
}
