import queryBrowser from "./browser";
import queryEngine from "./engine";
import { withEngine, withSearchQuery, withWebsite } from "../command";

export default function query(): void {
  if (withEngine || withSearchQuery || withWebsite) {
    queryEngine();
    return;
  }

  queryBrowser();
}
