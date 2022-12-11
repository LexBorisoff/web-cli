import { getConfigItemByNameOrAlias } from "./utils";
import { Engine } from "../types";
import { engines } from "../data";

export default function getEngine(engineName: string): Engine | undefined {
  return getConfigItemByNameOrAlias(engineName, engines);
}
