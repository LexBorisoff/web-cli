import chalk from "chalk";
import getQueryArgs from "./getQueryArgs.js";
import getDataArgs from "./getDataArgs.js";
import getInvalidArgs from "./getInvalidArgs.js";
import { withURLsOnly } from "../with.js";
import {
  getDefaultsData,
  engineFlags,
  browserProfileFlags,
} from "../../data/index.js";
import { getBrowserName } from "../../helpers/browser/index.js";
import { severity } from "../../helpers/print/index.js";
import { orArray } from "../../utilities/index.js";

const { warning, error } = severity;
const defaults = getDefaultsData();
const args = getQueryArgs();
const invalidArgs = getInvalidArgs();
const engineArgs = getDataArgs.engine(false);
const browserArgs = getDataArgs.browser(false);

function isEmptyArg(list: string[]): boolean {
  return list.length === 1 && list[0] === "";
}

/**
 * Returns an array of error messages with invalid args
 * (empty array if all args are valid)
 */
export default function validateArgs(): string[] {
  const errorMessages: string[] = [];

  function add(message: string) {
    errorMessages.push(message);
  }

  /* VALIDATE CLI ARGS */
  if (invalidArgs.length > 0) {
    add(error(`Invalid options: ${warning(invalidArgs.join(", "))}`));
  }

  /* VALIDATE ENGINE ARGS */
  if (isEmptyArg(engineArgs)) {
    add(error(`${chalk.italic("--engine")} option must have a value`));
  }

  const invalidEngines = engineArgs.filter(
    (arg) => arg !== "" && !engineFlags.includes(arg)
  );

  if (invalidEngines.length > 0) {
    add(error(`Invalid search engines: ${warning(invalidEngines.join(" "))}`));
  }

  /* VALIDATE ROUTE ARGS */
  const route = orArray(args.route);
  if (route != null) {
    const emptyList = Array.isArray(route) && route.every((arg) => arg === "");
    const emptyArg = !Array.isArray(route) && route === "";
    if (emptyList || emptyArg) {
      add(error(`${chalk.italic("--route")} option must have a value`));
    }

    if (engineArgs.length === 0) {
      add(
        error(`${chalk.italic("--route")} option must be used with an engine`)
      );
    }
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
    add(error(`${chalk.italic("--browser")} option must have a value`));
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

  validateProfileArgs(
    browserArgs.length > 0 ? browserArgs : defaults.browser?.[0]
  );

  // VALIDATE PORT ARG
  if (args.port != null && args.address == null && !withURLsOnly) {
    add(
      error(
        `${chalk.italic("--port")} option must be used with a URL or --address`
      )
    );
  }

  return errorMessages.sort((a, b) => a.localeCompare(b));
}
