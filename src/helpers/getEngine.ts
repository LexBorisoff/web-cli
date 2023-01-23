import { getConfigItemByNameOrAlias } from "./utils";
import { engines, engineFallback } from "../data";
import { Engine } from "../types";

export default function getEngine(
  engineNameOrAlias: string = engineFallback
): Engine | undefined {
  return getConfigItemByNameOrAlias(engineNameOrAlias, engines);
}
