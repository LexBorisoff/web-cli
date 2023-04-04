import getArgs from "./getArgs";
import { urlPattern } from "../helpers/patterns";

const args = getArgs();

export default function hasSearchQuery() {
  return args._.filter((arg) => urlPattern.test(`${arg}`)).length > 0;
}
