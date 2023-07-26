import { getConfigItem, defaultEngineConfig } from "../config";
import { getEnginesData } from "../../data";
import { Engine } from "../../types/config.types";

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
