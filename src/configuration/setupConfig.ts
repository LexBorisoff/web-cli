import * as fs from "fs";
import printTitle from "./printTitle";
import getConfigFileName from "./getConfigFileName";
import {
  getKnownBrowsers,
  getExtraBrowsers,
  getDefaultBrowser,
  getBrowsersConfig,
} from "./getBrowsers";
import { configFileExists, configFileIsEmpty } from "./checkConfigFile";
import { Config } from "../types";

const emptyLine = () => console.log("");

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

    emptyLine();
    printTitle("You are good to go. Have fun!");
    emptyLine();
  });
}

async function getBrowserList(): Promise<string[]> {
  const knownBrowsers = await getKnownBrowsers();

  if (knownBrowsers != null) {
    emptyLine();
    const extraBrowsers = await getExtraBrowsers();
    return [...new Set([...knownBrowsers, ...extraBrowsers])];
  }

  return [];
}

export default async function setupConfig(): Promise<void> {
  printTitle("Let's set up browser config");
  emptyLine();

  // 1) list of browsers
  const browserList = await getBrowserList();
  emptyLine();

  if (browserList.length > 0) {
    // 2) default browser
    const defaultBrowser = await getDefaultBrowser(browserList);
    emptyLine();

    if (defaultBrowser != null) {
      // 3) TODO: browser aliases
      const browsers = await getBrowsersConfig(browserList);
      emptyLine();

      // 4) TODO: browser profiles

      // 5) TODO: profile aliases

      try {
        createConfigFile({
          browsers,
          defaults: {
            browser: defaultBrowser,
          },
        });
      } catch (error) {
        console.error(
          "An error occurred while trying to create the config file."
        );
      }
    }
  } else {
    printTitle("You didn't add any browsers:( Try again...");
    emptyLine();
  }
}
