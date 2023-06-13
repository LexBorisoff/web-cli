import { getConfigItem, hasData } from "../config";
import { getEnginesData } from "../../data";
import { Engine } from "../../types/engine.types";
import setupInitialEngines from "../../config/setup/setupInitialEngines";

export default function getEngine(
  engineNameOrAlias?: string
): Engine | undefined {
  if (engineNameOrAlias == null) {
    return undefined;
  }

  const hasEngines = hasData("engines");
  if (!hasEngines) {
    setupInitialEngines();
  }

  const engines = getEnginesData();
  return getConfigItem(engineNameOrAlias, engines);
}
