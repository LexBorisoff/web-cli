import { getConfigItem, initialEngines } from "../config";
import { getEnginesData } from "../../data";
import type { Engine } from "../../types/config";

/**
 * Returns a tuple with the engine's config key and the Engine object
 * if it can be found in the config by the provided name or alias.
 * Otherwise returns undefined
 */
export default function getEngine(
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
