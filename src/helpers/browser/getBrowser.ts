import { getConfigItem } from "../config";
import { getBrowsersData } from "../../data";
import { Browser } from "../../types/config.types";

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
