import * as fs from "fs";
import printTitle from "./printTitle";
import getConfigFileName from "./getConfigFileName";
import getBrowsersConfig from "./getBrowsersConfig";
import { configFileExists, configFileIsEmpty } from "./checkConfigFile";
import { emptyLine } from "../helpers";
import { getDefaultsData } from "../data";
import { Config } from "../types";

const configFileName = getConfigFileName();

function createConfigFile(config: Config = {}): void {
  if (configFileExists() && !configFileIsEmpty()) {
    printTitle("Config already exists");
    return;
  }

  const json = JSON.stringify(config);

  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }

    printTitle("You are good to go. Have fun!", "success");
    emptyLine();
  });
}

export default async function setupConfigFile(): Promise<void> {
  printTitle("Let's set up browser config", "success");
  emptyLine();

  const browsersConfig = await getBrowsersConfig();

  if (browsersConfig != null) {
    emptyLine();

    const { browsers, defaultBrowser } = browsersConfig;
    const defaults = await getDefaultsData();

    try {
      createConfigFile({
        defaults: {
          ...defaults,
          browser: defaultBrowser,
        },
        browsers,
      });
    } catch (error) {
      printTitle("Couldn't create the config file :(", "error");
      console.error(error);
    }
  } else {
    printTitle("Okay, let's just not do it then", "error");
    emptyLine();
  }
}
