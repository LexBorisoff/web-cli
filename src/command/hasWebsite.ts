import getArgs from "./getArgs";
import { urlPattern } from "../helpers/patterns";

const { _: args } = getArgs();

export default function hasSearchQuery() {
  return args.filter((arg) => urlPattern.test(`${arg}`)).length > 0;
}
