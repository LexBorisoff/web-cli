import { getConfigItemByNameOrAlias } from "./utils";
import { Engine } from "../types/engines";
import { engines, defaults } from "../data";

export default function getEngine(
  engineNameOrAlias: string = defaults.engine
): Engine | undefined {
  return getConfigItemByNameOrAlias(engineNameOrAlias, engines);
}
