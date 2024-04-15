import { configFlags } from "../../data/config-flags.js";
import { options, yargsOptions } from "../options.js";
import { getQueryArgs } from "./get-query-args.js";

const args = getQueryArgs();

/**
 * Returns a list of args that do not match CLI and yargs' options,
 * or the custom flags derived from the config's engine, browser,
 * and profile values. Does not check against config options.
 */
export function getInvalidArgs(): string[] {
  return Object.keys(args)
    .filter((key) => !yargsOptions.includes(key))
    .filter((key) => ![...options, ...configFlags].includes(key));
}
