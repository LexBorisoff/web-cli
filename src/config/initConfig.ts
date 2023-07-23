import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import { getConfigArgs } from "../command";
import {
  fileExists,
  getPath,
  getSettingsPath,
  defaultEngine,
  defaultEngineConfig,
} from "../helpers/config";
import { print, printSuccess, printError, emptyLine } from "../helpers/print";
import { cliPrompts } from "../helpers/prompts";
import { ConfigData } from "../types/config.types";

const { _: args, force } = getConfigArgs();
const { toggle } = cliPrompts;
const space = 2;

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

function writeConfigFile(configPath: string) {
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, space));
}

function writeSettingsFile(configPath: string) {
  const settings = { path: configPath };
  fs.writeFileSync(getSettingsPath(), JSON.stringify(settings, null, space));
}

export default async function initConfig() {
  const [, ...values] = args;

  if (values.length > 1) {
    printError("Invalid number of arguments.");
    print(
      chalk.gray(
        `Use the format "${chalk.cyanBright("--config init [directory]")}"`
      )
    );
    emptyLine();
    return;
  }

  let proceed: boolean | undefined = force;
  let directoryPath = path.resolve(".");
  let successWithPath = true;

  const pathArg = values.at(0);

  if (pathArg != null) {
    directoryPath = path.resolve(pathArg.toString());
    const response = await isDirectory(directoryPath);

    if (response !== true) {
      printError(response);
      emptyLine();
      return;
    }
  }

  const configPath = getPath();
  const filename = "websearch.json";
  const newConfigPath = path.resolve(`${directoryPath}/${filename}`);

  // there is an existing config file in memory
  if (fileExists() && configPath != null && configPath !== newConfigPath) {
    // ask to proceed
    if (!proceed) {
      proceed = await toggle(
        `${chalk.italic.yellowBright(
          "Config file already exists at the following path:"
        )}\n  ${configPath}\n\n  ${chalk.cyanBright("Delete it?")}`,
        false
      );
      emptyLine();
    }

    if (proceed) {
      fs.unlinkSync(configPath);
    }
  }
  // config file exists at the same path
  else if (fs.existsSync(newConfigPath) && !proceed) {
    // ask to proceed
    proceed = await toggle(
      `${chalk.italic.yellowBright(
        "Config file already exists in this directory"
      )}\n  ${chalk.cyanBright("Override it?")}`,
      false
    );
    emptyLine();
  }
  // creating a new file
  else if (!proceed) {
    successWithPath = false;
    proceed = await toggle(
      `${chalk.italic.yellowBright(
        "Store the config file at this path?"
      )}\n  ${newConfigPath}\n`,
      true
    );
    emptyLine();
  }

  if (!proceed) {
    return;
  }

  try {
    writeConfigFile(newConfigPath);
    writeSettingsFile(newConfigPath);
    const message = "Initialzed a new config file";

    if (successWithPath) {
      printSuccess(`${message} at:`);
      print(newConfigPath);
      emptyLine();
    } else {
      printSuccess(message);
    }

    print(
      chalk.gray(`Use "${chalk.cyanBright(`--config open [app]`)}" to open it`)
    );
  } catch {
    printError("Failed to create the config file at the provided path");
  }

  emptyLine();
}
