import * as fs from "fs";
import getConfigFileName from "./getConfigFileName";
import {
  getKnownBrowsers,
  getExtraBrowsers,
  getDefaultBrowser,
} from "./getBrowsers";
import { configFileExists, configFileIsEmpty } from "./checkConfigFile";
import { Config } from "../types";

const print = console.log;

function title(title: string): void {
  const columnsLength = 2;
  let line = "";
  const lineLength = 60;
  for (let i = 0; i < lineLength; i++) {
    line += "=";
  }

  if (line.length - title.length - columnsLength <= 0) {
    print(line);
    print(title);
    print(line);
    return;
  }

  const spaces = line.length - title.length - columnsLength;
  const half = spaces % 2 === 0 ? spaces / 2 : spaces / 2 - 1;

  let spacesLeft = "";
  for (let i = 0; i < half; i++) {
    spacesLeft += " ";
  }

  let spacesRight = spacesLeft;
  if (spaces % 2 > 0) {
    spacesRight += " ";
  }

  const titleLine = `>${spacesLeft}${title}${spacesRight}<`;

  print(line);
  print(titleLine);
  print(line);
}

const configFileName = getConfigFileName();

function createConfigFile(config: Config = {}): void {
  if (configFileExists() && !configFileIsEmpty()) {
    title("Config already exists");
    return;
  }

  const json = JSON.stringify(config);

  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }

    print("");
    title("You are good to go. Have fun!");
    print("");
  });
}

async function getBrowserList(): Promise<string[]> {
  const knownBrowsers = await getKnownBrowsers();
  if (knownBrowsers != null) {
    print("");
    const extraBrowsers = await getExtraBrowsers();
    const browserList = [...new Set([...knownBrowsers, ...extraBrowsers])];
    print("");
    return browserList;
  }
  return [];
}

export default async function setupConfig(): Promise<void> {
  title("Let's set up browser config");
  print("");

  // 1) list of browsers
  const browserList = await getBrowserList();
  if (browserList.length > 0) {
    // 2) default browser
    const defaultBrowser = await getDefaultBrowser(browserList);
    if (defaultBrowser != null) {
      // 3) TODO: browser aliases
      const browsers = browserList;

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
  }
}
