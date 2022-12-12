import getArgs from "../command/getArgs";
import { Engine } from "../types";
import { defaults } from "../data";

const args = getArgs();

export default function getSearchQuery(engine?: Engine) {
  const delimiter = engine?.delimiter ?? defaults.delimiter;
  return args._.join(delimiter);
}
