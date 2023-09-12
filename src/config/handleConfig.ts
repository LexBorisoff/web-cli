import * as fs from "fs";
import * as path from "path";
import { getConfigArgs } from "../command/args";
import { orArray } from "../command/args/utils";
import { ConfigOption } from "../command/options";
import { defaultEngineConfig, getConfigPath } from "../helpers/config";
import {
  print,
  printError,
  emptyLine,
  severity,
  printSuccess,
} from "../helpers/print";
import { BrowsersData } from "../types/config.types";
import openConfig from "./openConfig";

const configPath = getConfigPath();
const { config } = getConfigArgs();

function createConfigDirectory(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.mkdir(configPath, { recursive: true }, (error) => {
      if (error != null) {
        reject(new Error("Could not create config folder."));
      } else {
        resolve(true);
      }
    });
  });
}

function handleConfigFile<Data>(
  configOption: ConfigOption.Browsers | ConfigOption.Engines,
  initialData: Data
): boolean {
  const filePath = path.join(configPath, `${configOption}.json`);
  let fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    try {
      const space = 2;
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, space));
      fileExists = true;
    } catch (error) {
      printError(`Failed to create ${configOption} config.`);
      emptyLine();
      return false;
    }
  }

  if (fileExists) {
    openConfig(filePath);
    return true;
  }

  return false;
}

function validateConfigArgs() {
  const invalidValues: string[] = [];

  function add(option: string) {
    invalidValues.push(option);
  }

  function validate(arg: string) {
    if (
      arg !== ConfigOption.Browsers &&
      arg !== ConfigOption.Engines &&
      arg !== ""
    ) {
      add(arg);
    }
  }

  const configArg = orArray(config);

  if (configArg != null) {
    const configArgs = Array.isArray(configArg) ? configArg : [configArg];
    configArgs.forEach((arg) => {
      validate(arg);
    });
  }

  return invalidValues;
}

function isConfigOption(configOption: string): boolean {
  const configArg = orArray(config);
  if (configArg != null) {
    if (Array.isArray(configArg)) {
      return configArg.includes(configOption);
    }

    return configArg === configOption;
  }

  return false;
}

export default async function handleConfig(): Promise<void> {
  const invalidValues = validateConfigArgs();
  const { info, error, warning } = severity;
  let isEmptyLine = false;

  if (invalidValues.length > 0) {
    print(error(`Invalid values: ${warning(invalidValues.join(", "))}`));
    isEmptyLine = true;
  }

  let configExists = fs.existsSync(configPath);

  if (!configExists) {
    try {
      configExists = await createConfigDirectory();
    } catch (error) {
      if (error instanceof Error) {
        console.error(severity.error(error.message));
        isEmptyLine = true;
      }
    }
  }

  if (configExists) {
    const openingConfigs: ConfigOption[] = [];

    if (isConfigOption(ConfigOption.Browsers)) {
      const success = handleConfigFile<BrowsersData>(ConfigOption.Browsers, {});
      if (success) {
        openingConfigs.push(ConfigOption.Browsers);
      }
    }

    if (isConfigOption(ConfigOption.Engines)) {
      const success = handleConfigFile(
        ConfigOption.Engines,
        defaultEngineConfig
      );
      if (success) {
        openingConfigs.push(ConfigOption.Engines);
      }
    }

    if (isConfigOption("")) {
      print(`${info("Config directory")}: ${configPath}`);
      isEmptyLine = true;
    }

    if (openingConfigs.length > 0) {
      printSuccess(`Opening config: ${info(openingConfigs.join(", "))}`);
      isEmptyLine = true;
    }

    if (isEmptyLine) {
      emptyLine();
    }
  }
}
