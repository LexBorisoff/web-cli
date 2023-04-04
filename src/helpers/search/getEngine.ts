import { getConfigItemByNameOrAlias } from "../utils";
import { getEnginesData, engineFallback } from "../../data";
import { Engine } from "../../types/engines.types";

export default async function getEngine(
  engineNameOrAlias: string = engineFallback
): Promise<Engine | undefined> {
  const engines = await getEnginesData();
  return getConfigItemByNameOrAlias(engineNameOrAlias, engines);
}
