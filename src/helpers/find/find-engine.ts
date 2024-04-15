import { initialEngines } from "../config/index.js";
import { getEnginesData } from "../../data/get-engines-data.js";
import type { Engine } from "../../types/config.js";
import { findConfigItem } from "./find-config-item.js";

/**
 * Returns a tuple with the engine's config key and the Engine object
 * if it can be found in the config by the provided name or alias.
 * Otherwise returns undefined
 */
export function findEngine(
  engineNameOrAlias?: string
): [string, Engine] | undefined {
  if (engineNameOrAlias == null) {
    return undefined;
  }

  const enginesData = getEnginesData();
  const hasEnginesData = Object.keys(enginesData).length > 0;

  return findConfigItem(
    engineNameOrAlias,
    hasEnginesData ? enginesData : initialEngines
  );
}
