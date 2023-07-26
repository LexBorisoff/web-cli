import { urlPattern } from "../patterns";
import { getArgs } from "../../command";
import { getDefaultsData } from "../../data";
import { Engine } from "../../types/config.types";

const { _: args } = getArgs();

export default function getSearchQuery(engine?: Engine): string {
  const defaults = getDefaultsData();
  const delimiter = engine?.delimiter ?? defaults.delimiter;
  return args.filter((arg) => !urlPattern.test(`${arg}`)).join(delimiter);
}
