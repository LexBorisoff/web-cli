import chalk from "chalk";
import getDataArgs from "./getDataArgs";
import getInvalidArgs from "./getInvalidArgs";
import isEmptyArg from "./isEmptyArg";
import { getDefaultsData, engineFlags, browserProfileFlags } from "../../data";
import { getBrowserName } from "../../helpers/browser";
import { severity } from "../../helpers/print";

const { warning, error } = severity;
const defaults = getDefaultsData();
const invalidArgs = getInvalidArgs();
const engineArgs = getDataArgs.engine(false);
const browserArgs = getDataArgs.browser(false);

/**
 * Returns an array of error messages for invalid args
 * (empty array if all args are valid)
 */
export default function validateArgs(): string[] {
  const errors: string[] = [];

  function add(message: string) {
    errors.push(message);
  }

  /* VALIDATE CLI ARGS */
  if (invalidArgs.length > 0) {
    add(error(`Invalid options: ${warning(invalidArgs.join(", "))}`));
  }

  /* VALIDATE ENGINE ARGS */
  if (isEmptyArg(engineArgs)) {
    add(error(`${chalk.italic("--search")} option must have a value`));
  }

  const invalidEngines = engineArgs.filter(
    (arg) => arg !== "" && !engineFlags.includes(arg)
  );

  if (invalidEngines.length > 0) {
    add(error(`Invalid search engines: ${warning(invalidEngines.join(" "))}`));
  }

  /**
   * VALIDATE BROWSER ARGS
   *
   * Only an empty browser option should is checked.
   * A browser value that does not exist in the config should still be valid
   * because it is an app that should be attempted to open
   */
  const emptyBrowserArg = isEmptyArg(browserArgs);
  if (emptyBrowserArg) {
    add(error(`${chalk.italic("--open")} option must have a value`));
  }

  /**
   * VALIDATE PROFILE ARGS
   *
   * @param browser
   * * If a single string is provided - profile args are checked against
   * profile keys and aliases of the provided config browser
   * * String array, null or undefined - profile args are validated against
   * profile keys and aliases of all config browsers
   */
  function validateProfileArgs(browser?: string | string[] | null) {
    const profileArgs = getDataArgs.profile(
      browser == null || Array.isArray(browser) ? null : browser,
      false
    );

    if (isEmptyArg(profileArgs)) {
      add(error(`${chalk.italic("--profile")} option must have a value`));
    }

    let flags: { [browserName: string]: string[] } = {};

    if (browser != null) {
      (Array.isArray(browser) ? browser : [browser]).forEach(
        (browserNameOrAlias) => {
          const browserName = getBrowserName(browserNameOrAlias);
          const profileFlags = browserProfileFlags[browserName];

          flags = {
            ...flags,
            [browserName]: profileFlags ?? [],
          };
        }
      );
    }

    const invalidProfiles = profileArgs.filter(
      (arg) => arg !== "" && !Object.values(flags).flat().includes(arg)
    );

    if (invalidProfiles.length > 0) {
      add(error(`Invalid profiles: ${warning(invalidProfiles.join(" "))}`));
    }
  }

  /* VALIDATE PROFILE ARGS */
  if (!emptyBrowserArg) {
    validateProfileArgs(
      browserArgs.length > 0 ? browserArgs : defaults.browser
    );
  }

  return errors.sort((a, b) => a.localeCompare(b));
}
