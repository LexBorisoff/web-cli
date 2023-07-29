import getArgs from "./getArgs";
import { options, yargsOptions } from "./options";
import configFlags from "./configFlags";

const args = getArgs();

/**
 * Returns a list of args that do not match CLI and yargs' options,
 * or the custom flags derived from the config's engine, browser, and profile values
 */
export default function getInvalidArgs(): string[] {
  return Object.keys(args).filter(
    (key) => ![...options, ...yargsOptions, ...configFlags].includes(key)
  );
}
