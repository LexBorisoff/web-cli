import queryBrowser from "./browser";
import { validateArgs } from "../command";
import { getURLs } from "../helpers/search";
import { print, success } from "../helpers/print";

export default function query(): void {
  const errors = validateArgs();

  if (errors.length > 0) {
    errors.forEach((message) => {
      print(message);
    });
    return;
  }

  const urls = getURLs();
  if (urls.length > 0) {
    urls.forEach((url) => {
      queryBrowser(url);
      print(`> ${success(url)}`);
    });

    return;
  }

  queryBrowser();
}
