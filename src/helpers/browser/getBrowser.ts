import { getConfigItem } from "../config/index.js";
import { getBrowsersData } from "../../data/index.js";
import type { Browser } from "../../types/config.d.ts";

const browsersData = getBrowsersData();

/**
 * Returns a tuple with the browser's config key and the Item object
 * found in the config by provided name or alias. Otherwise returns undefined
 */
export default function getBrowser(
  profileNameOrAlias: string
): [string, Browser] | undefined {
  return getConfigItem(profileNameOrAlias, browsersData);
}
