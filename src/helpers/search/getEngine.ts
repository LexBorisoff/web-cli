import { getConfigItem, defaultEngineConfig } from "../config";
import { getEnginesData } from "../../data";
import { Engine } from "../../types/config.types";

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
    hasEnginesData ? enginesData : defaultEngineConfig
  );
}
