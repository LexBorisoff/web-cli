import { Engine } from "types";
import { engines } from "data";
import { getConfigItemByNameOrAlias } from "./utils";

export default function getEngine(engineName: string): Engine | undefined {
  return getConfigItemByNameOrAlias(engineName, engines);
}
