import type { ConfigBrowser } from "../../types/config.types.js";
import { getBrowsersData } from "../../data/get-browsers-data.js";
import { findConfigItem } from "./find-config-item.js";

const browsersData = getBrowsersData();

/**
 * Returns a tuple with the browser's config key and the Item object
 * found in the config by provided name or alias. Otherwise returns undefined
 */
export function findBrowser(
  browserNameOrAlias: string
): [string, ConfigBrowser] | undefined {
  return findConfigItem(browserNameOrAlias, browsersData);
}
