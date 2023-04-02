import getArgs from "./getArgs";
import { getUrlPattern } from "../helpers/utils";

const args = getArgs();
const urlPattern = getUrlPattern();

export default function hasSearchQuery() {
  return args._.filter((arg) => urlPattern.test(`${arg}`)).length > 0;
}
