import { getConfigItem, defaultEngineConfig } from "../config";
import { getEnginesData } from "../../data";
import { Engine } from "../../types/config.types";

/**
 * Returns an Engine object from the config if it can be found
 * by the provided name or alias, and undefined otherwise
 */
export default function getEngine(
  engineNameOrAlias?: string
): Engine | undefined {
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
