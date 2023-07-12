import { baseUrlPattern } from "../patterns";
import { getArgs } from "../../command";
import { getDefaultsData } from "../../data";
import { Engine } from "../../types/engine.types";

const args = getArgs();

export default function getSearchQuery(engine?: Engine): string {
  const defaults = getDefaultsData();
  const delimiter = engine?.delimiter ?? defaults.delimiter;
  return args._.filter((arg) => !baseUrlPattern.test(`${arg}`)).join(delimiter);
}
