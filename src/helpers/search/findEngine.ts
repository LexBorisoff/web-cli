import { getConfigItem, initialEngines } from "../config/index.js";
import { getEnginesData } from "../../data/index.js";
import type { Engine } from "../../types/config.js";

/**
 * Returns a tuple with the engine's config key and the Engine object
 * if it can be found in the config by the provided name or alias.
 * Otherwise returns undefined
 */
export default function findEngine(
  engineNameOrAlias?: string
): [string, Engine] | undefined {
  if (engineNameOrAlias == null) {
    return undefined;
  }

  const enginesData = getEnginesData();
  const hasEnginesData = Object.keys(enginesData).length > 0;

  return getConfigItem(
    engineNameOrAlias,
    hasEnginesData ? enginesData : initialEngines
  );
}
