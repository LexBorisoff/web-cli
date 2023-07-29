import getEngineArgs from "./getEngineArgs";
import getBrowserArgs from "./getBrowserArgs";
import getInvalidArgs from "./getInvalidArgs";
import isEmptyArg from "./isEmptyArg";
import { engineFlags, browserFlags } from "../../data";
import { warning, error } from "../../helpers/print";

const invalidArgs = getInvalidArgs();
const engineArgs = getEngineArgs();
const browserArgs = getBrowserArgs();

/**
 * Validates engine and browser args
 *
 * Returns a list of error messages
 */
export default function validateArgs(): string[] {
  const errors: string[] = [];

  function add(message: string) {
    errors.push(message);
  }

  if (invalidArgs.length > 0) {
    add(error(`Invalid options: ${invalidArgs.join(", ")}`));
  }

  // single option was provided without a value
  if (isEmptyArg(engineArgs)) {
    add(error("Engine option must have a value"));
  }

  if (isEmptyArg(browserArgs)) {
    add(error("Browser option must have a value"));
  }

  const invalidEngines = engineArgs.filter(
    (arg) => arg !== "" && !engineFlags.includes(arg)
  );

  if (invalidEngines.length > 0) {
    add(error(`Invalid engines: ${warning(invalidEngines.join(" "))}`));
  }

  const invalidBrowsers = browserArgs.filter(
    (arg) => arg !== "" && !browserFlags.includes(arg)
  );

  if (invalidBrowsers.length > 0) {
    add(error(`Invalid browsers: ${warning(invalidBrowsers.join(" "))}`));
  }

  return errors;
}
