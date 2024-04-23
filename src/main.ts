import { validateArgs } from "./command/args/validate-args.js";
import { print } from "./helpers/print/severity.js";
import { getEngines } from "./query/get-engines.js";
import { openUrls } from "./query/open-urls.js";
import { getUrls } from "./query/get-urls.js";

export function main() {
  const errors = validateArgs();
  if (errors.length > 0) {
    errors.forEach((message) => {
      print(message);
    });
    return;
  }

  const engines = getEngines();

  // urls
  const urls: string[] = engines.map((engine) => getUrls(engine)).flat();
  openUrls(urls);
}
