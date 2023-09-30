import findConfigItem from "./findConfigItem.js";
import { getBrowsersData } from "../../data/index.js";
import type { Browser } from "../../types/config.js";

const browsersData = getBrowsersData();

/**
 * Returns a tuple with the browser's config key and the Item object
 * found in the config by provided name or alias. Otherwise returns undefined
 */
export default function findBrowser(
  browserNameOrAlias: string
): [string, Browser] | undefined {
  return findConfigItem(browserNameOrAlias, browsersData);
}
