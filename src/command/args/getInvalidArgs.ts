import getArgs from "./getArgs";
import { options, yargsOptions } from "../options";
import { configFlags } from "../../data";

const args = getArgs();

/**
 * Returns a list of args that do not match CLI and yargs' options,
 * or the custom flags derived from the config's engine, browser, and profile values
 */
export default function getInvalidArgs(): string[] {
  return Object.keys(args)
    .filter((key) => !yargsOptions.includes(key))
    .filter((key) => ![...options, ...configFlags].includes(key));
}
