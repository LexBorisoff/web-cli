import queryBrowser from "./browser";
import queryEngine from "./engine";
import { withEngine, withSearchQuery, withWebsite } from "../command";

export default async function query(): Promise<void> {
  if (withEngine || withSearchQuery || withWebsite) {
    await queryEngine();
    return;
  }

  await queryBrowser();
}
