import { urlPattern } from "../helpers/patterns";
import getArgs from "./getArgs";

const { _: args } = getArgs();

/**
 * Returns a list of args that match the url pattern
 */
export default function getWebsiteArgs() {
  return args
    .map((arg) => (typeof arg === "string" ? arg : `${arg}`))
    .filter((arg) => urlPattern.test(arg));
}
