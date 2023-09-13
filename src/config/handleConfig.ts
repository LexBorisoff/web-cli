import * as fs from "fs";
import * as path from "path";
import { getConfigArgs } from "../command/args";
import { ConfigValue, configValues } from "../command/options";
import {
  initialEngines,
  getConfigPath,
  readConfigFile,
} from "../helpers/config";
import { print, printError, emptyLine, severity } from "../helpers/print";
import { orArray } from "../utilities";
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

/**
 * Returns true if config was opened, false otherwise
 */
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
    }
  }

  if (!proceed) {
    return false;
  }

  openConfig(filePath);
  return true;
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
  const { info, success, warning, error } = severity;

  if (invalidValues.length > 0) {
    print(error(`Invalid values: ${warning(invalidValues.join(", "))}`));
    emptyLine();
    return;
  }

  let configExists = fs.existsSync(configPath);

  if (!configExists) {
    try {
      configExists = await createConfigDirectory();
    } catch (e) {
      if (e instanceof Error) {
        console.error(error(e.message));
        return;
      }
    }
  }

  if (configExists) {
    const messages: string[] = [];
    const openingConfigs: ConfigValue[] = [];

    if (isConfigOption(ConfigValue.Browsers)) {
      const isOpened = handleConfigFile<BrowsersData>(ConfigValue.Browsers, {});
      if (isOpened) {
        openingConfigs.push(ConfigValue.Browsers);
      }
    }

    if (isConfigOption(ConfigValue.Engines)) {
      const isOpened = handleConfigFile(ConfigValue.Engines, initialEngines);
      if (isOpened) {
        openingConfigs.push(ConfigValue.Engines);
      }
    }

    if (isConfigOption("")) {
      messages.push(`${info("Config directory")}: ${configPath}`);
    }

    if (openingConfigs.length > 0) {
      messages.push(
        success(`Opening config: ${info(openingConfigs.join(", "))}`)
      );
    }

    if (messages.length > 0) {
      messages.forEach((message) => {
        print(message);
      });
      emptyLine();
    }
  }
}
