import { getConfigItem } from "../config";
import { getEnginesData } from "../../data";
import { Engine } from "../../types/engines.types";

export default async function getEngine(
  engineNameOrAlias?: string
): Promise<Engine | undefined> {
  if (engineNameOrAlias == null) {
    return undefined;
  }

  const engines = await getEnginesData();
  return getConfigItem(engineNameOrAlias, engines);
}
