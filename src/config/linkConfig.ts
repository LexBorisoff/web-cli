import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { printFormat } from "./utils";
import { getConfigArgs } from "../command";
import { getSettings, getSettingsPath } from "../helpers/config";
import { print, printInfo, printError, emptyLine } from "../helpers/print";
import { cliPrompts } from "../helpers/prompts";
import { ConfigSettings } from "../types/config.types";

const { _: args, force } = getConfigArgs();
const { toggle } = cliPrompts;

const settingsPath = getSettingsPath();
const settings = getSettings() ?? {};
const { link: configLink } = settings;

interface ValidResponse {
  configPath: string;
}

interface InvalidResponse {
  message: string;
  printFormat: boolean;
}

function isValidResponse(
  response: ValidResponse | InvalidResponse
): response is ValidResponse {
  return "configPath" in response;
}

/**
 * Returns the config path if passes file validation
 */
function isValidConfigFile(
  values: Partial<typeof args>
): ValidResponse | InvalidResponse {
  if (values.length > 1) {
    return {
      message: "Invalid number of arguments",
      printFormat: true,
    };
  }

  const [configArg] = values;
  if (configArg == null) {
    return {
      message: "Filename must be provided",
      printFormat: true,
    };
  }

  if (typeof configArg !== "string" || !configArg.endsWith(".json")) {
    return {
      message: "Config must a .json file",
      printFormat: false,
    };
  }

  const configPath = path.resolve(configArg);
  if (!fs.existsSync(configPath)) {
    return {
      message: "Could not access the provided config file",
      printFormat: false,
    };
  }

  return { configPath };
}

export default async function linkFile(): Promise<void> {
  const [, ...values] = <Partial<typeof args>>args;
  const validation = isValidConfigFile(values);

  if (!isValidResponse(validation)) {
    printError(validation.message);
    if (validation.printFormat) {
      printFormat.link();
    }
    emptyLine();
    return;
  }

  const { configPath } = validation;
  const hasConfigLink = configLink != null && configLink !== "";

  let proceed: boolean | undefined =
    force || !hasConfigLink || !fs.existsSync(settingsPath);

  if (hasConfigLink) {
    if (configPath === configLink) {
      printInfo("This file is already linked");
      emptyLine();
      return;
    }

    if (!force) {
      proceed = await toggle(
        `${chalk.yellowBright(
          "The following config file will be replaced:"
        )}\n  ${configLink}\n\n  ${chalk.cyan("Proceed?")}`,
        false
      );
      emptyLine();
    }
  }

  if (proceed) {
    const updatedSettings: ConfigSettings = { ...settings, link: configPath };
    fs.writeFileSync(settingsPath, JSON.stringify(updatedSettings));

    print(`${chalk.greenBright("Linked")} ${configPath}`);
    emptyLine();
  }
}
