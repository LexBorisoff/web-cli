import * as fs from "node:fs";
import * as path from "node:path";
import { getConfigArgs } from "../command/args/index.js";
import { ConfigValue, configValues } from "../command/options.js";
import {
  initialEngines,
  getConfigPath,
  readConfigFile,
} from "../helpers/config/index.js";
import { print, printError, severity } from "../helpers/print/index.js";
import { orArray } from "../utilities/index.js";
import type { BrowsersData } from "../types/config.d.ts";
import openConfigFile from "./openConfigFile.js";

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
 * Returns config's file path if it has data or was successfully
 * written initial data. Otherwise returns null.
 */
function handleConfigFile<Data>(
  configType: ConfigValue.Browsers | ConfigValue.Engines,
  initialData: Data
) {
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

  return proceed ? filePath : null;
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
    return;
  }

  let configExists = fs.existsSync(configPath);

  if (!configExists) {
    try {
      configExists = await createConfigDirectory();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        return;
      }
    }
  }

  if (configExists) {
    const messages: string[] = [];
    const configFiles: Array<{
      value: ConfigValue;
      filePath: string;
    }> = [];

    // config directory
    if (isConfigOption("")) {
      messages.push(`${info("Config directory")}: ${configPath}`);
    }

    // config files
    [
      {
        value: ConfigValue.Browsers,
        data: {} as BrowsersData,
      },
      {
        value: ConfigValue.Engines,
        data: initialEngines,
      },
    ].forEach(({ value, data }) => {
      if (isConfigOption(value)) {
        const filePath = handleConfigFile(value, data);
        if (filePath != null) {
          configFiles.push({ value, filePath });
        }
      }
    });

    if (configFiles.length > 0) {
      const values = configFiles.map(({ value }) => value);
      messages.push(success(`Opening config: ${info(values.join(", "))}`));

      configFiles.forEach(({ filePath }) => {
        openConfigFile(filePath);
      });
    }

    // display messages
    if (messages.length > 0) {
      messages.forEach((message) => {
        print(message);
      });
    }
  }
}
