import { getConfigItem, hasData, defaultEngineConfig } from "../config";
import { getEnginesData } from "../../data";
import { Engine } from "../../types/config.types";

export default function getEngine(
  engineNameOrAlias?: string
): Engine | undefined {
  if (engineNameOrAlias == null) {
    return undefined;
  }

  const engines = hasData() ? getEnginesData() : defaultEngineConfig;
  return getConfigItem(engineNameOrAlias, engines);
}
