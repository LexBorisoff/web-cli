import { getArgs } from "../../command";
import { getDefaultsData } from "../../data";
import { Engine } from "../../types/config.types";

const { _: args } = getArgs();

/**
 * Returns a search query string using the engine's delimiter
 * or the default delimiter, if engine is not provided
 */
export default function getSearchQuery(engine?: Engine): string {
  const defaults = getDefaultsData();
  const delimiter = engine?.delimiter ?? defaults.delimiter;
  return args.join(delimiter);
}
