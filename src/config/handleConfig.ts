import * as fs from "fs";
import * as path from "path";
import { getConfigArgs } from "../command/args";
import { orArray } from "../command/args/utils";
import { ConfigValue, configValues } from "../command/options";
import {
  initialEngines,
  getConfigPath,
  readConfigFile,
} from "../helpers/config";
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
  configType: ConfigValue.Browsers | ConfigValue.Engines,
  initialData: Data
): boolean {
  const filePath = path.join(configPath, `${configType}.json`);
  const fileData = readConfigFile(configType);
  let proceed = fileData != null && fileData !== "";

  if (!proceed) {
    try {
      const space = 2;
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, space));
      proceed = true;
    } catch (error) {
      printError(`Failed to create ${configType} config.`);
      emptyLine();
      return false;
    }
  }

  if (proceed) {
    openConfig(filePath);
    return true;
  }

  return false;
}

function validateConfigArgs() {
  const invalidValues: string[] = [];
  const configValue = orArray(config);

  if (configValue != null) {
    const values = Array.isArray(configValue) ? configValue : [configValue];

    values.forEach((value) => {
      if (!configValues.includes(value) && value !== "") {
        invalidValues.push(value);
      }
    });
  }

  return invalidValues;
}

function isConfigOption(configType: string): boolean {
  const configArg = orArray(config);
  if (configArg == null) {
    return false;
  }

  return Array.isArray(configArg)
    ? configArg.includes(configType)
    : configArg === configType;
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
    const openingConfigs: ConfigValue[] = [];

    if (isConfigOption(ConfigValue.Browsers)) {
      const success = handleConfigFile<BrowsersData>(ConfigValue.Browsers, {});
      if (success) {
        openingConfigs.push(ConfigValue.Browsers);
      }
    }

    if (isConfigOption(ConfigValue.Engines)) {
      const success = handleConfigFile(ConfigValue.Engines, initialEngines);
      if (success) {
        openingConfigs.push(ConfigValue.Engines);
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
