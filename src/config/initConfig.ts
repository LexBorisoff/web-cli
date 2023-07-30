import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import { printFormat } from "./utils";
import { getConfigArgs } from "../command/args";
import {
  getSettings,
  getSettingsPath,
  defaultEngine,
  defaultEngineConfig,
} from "../helpers/config";
import {
  print,
  printInfo,
  printSuccess,
  printError,
  emptyLine,
} from "../helpers/print";
import { cliPrompts } from "../helpers/prompts";
import { ConfigData, ConfigSettings } from "../types/config.types";

const { _: args, force } = getConfigArgs();
const { toggle } = cliPrompts;

const settingsPath = getSettingsPath();
const { linkedPath } = getSettings() ?? {};

const defaultConfig: ConfigData = {
  defaults: {
    engine: defaultEngine,
    browser: null,
    profile: {},
  },
  browsers: {},
  engines: defaultEngineConfig,
};

async function isDirectory(directoryPath: string): Promise<true | string> {
  return new Promise((resolve) => {
    fs.stat(directoryPath, (error, stats) => {
      if (error) {
        resolve(`Could not access the directory:\n${directoryPath}`);
        return;
      }

      if (!stats.isDirectory()) {
        resolve(`Provided path is not a directory`);
        return;
      }

      resolve(true);
    });
  });
}

function writeConfigFile(configPath: string): void {
  const space = 2;
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, space));
}

function writeSettingsFile(configPath: string): void {
  const settings: ConfigSettings = { linkedPath: configPath };
  fs.writeFileSync(settingsPath, JSON.stringify(settings));
}

export default async function initConfig(): Promise<void> {
  const [, ...values] = args;

  if (values.length > 1) {
    printError("Invalid number of arguments.");
    printFormat.init();
    return;
  }

  let proceed: boolean | undefined = true;
  let directoryPath = path.resolve(".");

  const [pathArg] = <Partial<typeof values>>values;

  if (pathArg != null) {
    directoryPath = path.resolve(pathArg.toString());
    const response = await isDirectory(directoryPath);

    if (response !== true) {
      printError(response);
      return;
    }
  }

  const filename = "websearch.json";
  const newConfigPath = path.resolve(`${directoryPath}/${filename}`);

  // there is an existing config file somewhere in memory
  if (
    linkedPath != null &&
    fs.existsSync(linkedPath) &&
    linkedPath !== newConfigPath
  ) {
    if (force) {
      printInfo(`using "--force" to delete the old config file:`);
      print(linkedPath);
    } else {
      proceed = await toggle(
        `${chalk.yellowBright(
          "Config file already exists:"
        )}\n  ${linkedPath}\n\n  ${chalk.cyanBright("Delete it?")}`,
        false
      );
    }

    emptyLine();
    if (proceed || force) {
      fs.unlinkSync(linkedPath);
    }
  }
  // config file exists at the same path
  else if (fs.existsSync(newConfigPath)) {
    if (force) {
      printInfo(`using "--force" to override the existing config file`);
    } else {
      proceed = await toggle(
        `${chalk.yellowBright(
          "Config file already exists in this directory"
        )}\n  ${chalk.cyanBright("Override it?")}`,
        false
      );
    }

    emptyLine();
  }

  if (!proceed) {
    // create config settings with if it doesn't exist
    if (!fs.existsSync(settingsPath)) {
      const configSettings: ConfigSettings = { linkedPath: newConfigPath };
      fs.writeFileSync(settingsPath, JSON.stringify(configSettings));
    }
    return;
  }

  try {
    writeConfigFile(newConfigPath);
    writeSettingsFile(newConfigPath);

    printSuccess(`Initialzed a new config file:`);
    print(newConfigPath);
    emptyLine();
    printFormat.open();
  } catch {
    printError("Failed to create the config file");
  }
}
