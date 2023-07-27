import queryBrowser from "./browser";
import queryEngine from "./engine";
import { withEngine, withSearchQuery, withURL } from "../command";

export default function query(): void {
  if (withEngine || withSearchQuery || withURL) {
    queryEngine();
    return;
  }

  queryBrowser();
}
