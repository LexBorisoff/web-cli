import { getUrlPattern } from "../utils";
import { getArgs } from "../../command";
import { getDefaultsData } from "../../data";
import { Engine } from "../../types/engines.types";

const args = getArgs();
const urlPattern = getUrlPattern();

export default async function getSearchQuery(engine?: Engine): Promise<string> {
  const defaults = await getDefaultsData();
  const delimiter = engine?.delimiter ?? defaults.delimiter;
  return args._.filter((arg) => !urlPattern.test(`${arg}`)).join(delimiter);
}
