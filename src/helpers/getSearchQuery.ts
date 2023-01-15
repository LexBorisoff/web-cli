import { getUrlPattern } from "../helpers";
import { getArgs } from "../command";
import { Engine } from "../types/engines";
import { defaults } from "../data";

const args = getArgs();
const urlPattern = getUrlPattern();

export default function getSearchQuery(engine?: Engine) {
  const delimiter = engine?.delimiter ?? defaults.delimiter;
  return args._.filter((arg) => !urlPattern.test(`${arg}`)).join(delimiter);
}
