import * as fs from "fs";
import * as path from "path";
import { getConfigArgs } from "../command/args";
import { ConfigOption } from "../command/options";
import { defaultEngineConfig, getConfigPath } from "../helpers/config";
import { print, printError, emptyLine, severity } from "../helpers/print";
import { BrowsersData } from "../types/config.types";
import openConfig from "./openConfig";

const configPath = getConfigPath();
const { browsers, engines, config } = getConfigArgs();

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
  option: ConfigOption.Browsers | ConfigOption.Engines,
  initialData: Data
): void {
  const filePath = path.join(configPath, `${option}.json`);
  let fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    try {
      const space = 2;
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, space));
      fileExists = true;
    } catch (error) {
      printError(`Failed to create ${option} config.`);
      emptyLine();
    }
  }

  if (fileExists) {
    openConfig(filePath);
  }
}

export default async function handleConfig(): Promise<void> {
  let configExists = fs.existsSync(configPath);

  if (!configExists) {
    try {
      configExists = await createConfigDirectory();
    } catch (error) {
      if (error instanceof Error) {
        console.error(severity.error(error.message));
        emptyLine();
      }
    }
  }

  if (configExists) {
    if (browsers) {
      handleConfigFile<BrowsersData>(ConfigOption.Browsers, {});
    }

    if (engines) {
      handleConfigFile(ConfigOption.Engines, defaultEngineConfig);
    }

    if (config) {
      print(configPath);
      emptyLine();
    }
  }
}
