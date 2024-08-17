import chalk from "chalk";
import { matchers } from "../../core/utils/matchers.js";
import { defaultsData } from "../../data/defaults-data.js";
import {
  configEngineFlags,
  browserProfileFlags,
} from "../../data/config-flags.js";
import { getBrowserName } from "../../helpers/browser/get-browser-name.js";
import { logger } from "../../helpers/utils/logger.js";
import { invalidArgs } from "./invalid-args.js";
import { dataArgs } from "./data-args.js";
import { queryArgs, urlArgs } from "./query-args.js";

const { resource, search } = queryArgs;
const engineArgs = dataArgs.engine(false);
const browserArgs = dataArgs.browser(false);

const validate = {
  profiles: false,
};

const errorMessages: string[] = [];

function addMessage(message: string) {
  errorMessages.push(message);
}

function isEmptyArg(list: string[]): boolean {
  return list.length === 1 && list[0] === "";
}

function validateResource(
  value: string | string[],
  name: "resource" | "search",
  allowUrlArgs = true
): void {
  const emptyArg = !Array.isArray(value) && value === "";
  const emptyList = Array.isArray(value) && value.every((arg) => arg === "");

  if (emptyArg || emptyList) {
    addMessage(
      logger.level.error(
        `${chalk.italic(`--${name}`)} option must have a value`
      )
    );
  }

  if (engineArgs.length === 0 && (!allowUrlArgs || !urlArgs)) {
    addMessage(
      logger.level.error(
        `${chalk.italic(`--${name}`)} option must be used with --engine${allowUrlArgs ? " or URL" : ""}`
      )
    );
  }
}

/**
 * Validates provile args
 *
 * @param browser
 * * If a single string is provided - profile args are checked against
 * profile keys and aliases of the provided config browser
 * * String array, null or undefined - profile args are validated against
 * profile keys and aliases of all config browsers
 */
function validateProfileArgs(browser?: string | string[] | null) {
  const profileArgs = dataArgs.profile(
    browser == null || Array.isArray(browser) ? null : browser,
    false
  );

  if (isEmptyArg(profileArgs)) {
    addMessage(
      logger.level.error(
        `${chalk.italic("--profile")} option must have a value`
      )
    );
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
    addMessage(
      logger.level.error(
        `Invalid profiles: ${logger.level.warning(invalidProfiles.join(" "))}`
      )
    );
  }
}

/**
 * Returns an array of error messages with invalid args
 * (empty array if all args are valid)
 */
export function validateArgs(): string[] {
  /* ~~~ VALIDATE CLI ARGS ~~~ */
  if (invalidArgs.length > 0) {
    addMessage(
      logger.level.error(
        `Invalid options: ${logger.level.warning(invalidArgs.join(", "))}`
      )
    );
  }

  /* ~~~ VALIDATE ENGINE ARGS ~~~  */
  if (isEmptyArg(engineArgs)) {
    addMessage(
      logger.level.error(`${chalk.italic("--engine")} option must have a value`)
    );
  }

  const invalidEngines = engineArgs.filter(
    (arg) =>
      arg !== "" && !configEngineFlags.includes(arg) && !matchers.url.test(arg)
  );

  if (invalidEngines.length > 0) {
    addMessage(
      logger.level.error(
        `Invalid search engines: ${logger.level.warning(invalidEngines.join(" "))}`
      )
    );
  }

  /* ~~~ VALIDATE RESOURCE ARGS ~~~ */

  if (resource != null) {
    validateResource(resource, "resource");
  }

  /* ~~~ VALIDATE QUERY ARGS ~~~ */

  if (search != null) {
    validateResource(search, "search", false);
  }

  /**
   * ~~~ VALIDATE BROWSER ARGS ~~~
   *
   * Only an empty browser option should is checked.
   * A browser value that does not exist in the config should still be valid
   * because it is an app that should be attempted to open
   */
  const emptyBrowserArg = isEmptyArg(browserArgs);
  if (emptyBrowserArg) {
    addMessage(
      logger.level.error(
        `${chalk.italic("--browser")} option must have a value`
      )
    );
  }

  /* ~~~ VALIDATE PROFILE ARGS ~~~ */

  if (validate.profiles) {
    validateProfileArgs(
      browserArgs.length > 0 ? browserArgs : defaultsData.browser?.[0]
    );
  }

  /* ~~~ VALIDATE PORT ARG ~~~ */
  if ("port" in queryArgs) {
    if (queryArgs.port == null) {
      addMessage(
        logger.level.error(`${chalk.italic("--port")} option must have a value`)
      );
    }

    if (engineArgs.length === 0 && !urlArgs)
      addMessage(
        logger.level.error(
          `${chalk.italic("--port")} option must be used with --engine or URL`
        )
      );
  }

  return errorMessages.sort((a, b) => a.localeCompare(b));
}
