import queryBrowser from "./browser";
import queryEngine from "./engine";
import {
  getInvalidArgs,
  withEngine,
  withSearchQuery,
  withURL,
} from "../command";
import { printError, emptyLine } from "../helpers/print";

const invalidArgs = getInvalidArgs();

export default function query(): void {
  if (invalidArgs.length > 0) {
    printError(`Invalid options: ${invalidArgs.join(", ")}`);
    emptyLine();
    return;
  }

  if (withEngine || withSearchQuery || withURL) {
    queryEngine();
    return;
  }

  queryBrowser();
}
