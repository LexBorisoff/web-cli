import { getConfigItemByNameOrAlias } from "./utils";
import { Engine } from "../types";
import { engines, defaults } from "../data";

export default function getEngine(
  engineName: string = defaults.engine
): Engine | undefined {
  return getConfigItemByNameOrAlias(engineName, engines);
}
