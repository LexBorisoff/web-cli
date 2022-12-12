import getSearchQuery from "./getSearchQuery";

import getEngine from "../helpers/getEngine";
import { hasSearchQuery } from "../command";
import { defaults } from "../data";

export default function getUrl(engineName: string = defaults.engine) {
  const engine = getEngine(engineName);
  if (engine) {
    if (hasSearchQuery()) {
      const searchQuery = getSearchQuery(engine);
      return engine.url + engine.query + searchQuery;
    }
    return engine.url;
  }
}
