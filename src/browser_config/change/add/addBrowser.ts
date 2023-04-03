import * as fs from "fs";
import chalk from "chalk";
import { getConfigData, getBrowsersData, getDefaultsData } from "../../../data";
import getConfigFileName from "../../../helpers/getConfigFileName";
import {
  choicesPrompt,
  getChoiceArray,
  getChoiceTitle,
} from "../../../helpers/prompts";
import emptyLine from "../../../helpers/emptyLine";
import { namePattern } from "../../../helpers/getPattern";
import { BrowserObject } from "../../../types/config.types";

const { text, toggle } = choicesPrompt;

const configFileName = getConfigFileName();

async function isValidBrowserName(value: string): Promise<boolean | string> {
  if (!namePattern.test(value)) {
    return "Invalid browser name";
  }

  const browsers = await getBrowsersData();
  if (browsers.length > 0) {
    const browserNames = browsers.map((browser) =>
      typeof browser === "string" ? browser : browser.name
    );

    const found = browserNames.find(
      (browser) => browser.toLowerCase() === value.toLowerCase()
    );
    if (found != null) {
      return `${getChoiceTitle(found)} already exist`;
    }
  }

  return true;
}

async function getBrowserAliases(): Promise<string[]> {
  const browsers = await getBrowsersData();

  let aliases: string[] = [];
  browsers.forEach((browser) => {
    if (browser instanceof Object && browser.alias != null) {
      const { alias } = browser;
      aliases = Array.isArray(alias)
        ? [...aliases, ...alias]
        : [...aliases, alias];
    }
  });

  return aliases;
}

async function isValidAlias(
  aliases: string,
  browserName: string
): Promise<boolean | string> {
  const list = getChoiceArray(aliases);
  if (list.includes(browserName)) {
    return "Alias must differ from the browser name";
  }

  const browsers = await getBrowsersData();
  if (browsers.length === 0) {
    return true;
  }

  const found: string[] = [];
  const browserNames = browsers.map((browser) =>
    typeof browser === "string" ? browser : browser.name
  );
  const browserAliases = await getBrowserAliases();

  browserNames.forEach((browser) => {
    if (list.includes(browser)) {
      found.push(browser);
    }
  });

  browserAliases.forEach((alias) => {
    if (list.includes(alias)) {
      found.push(alias);
    }
  });

  return found.length === 0
    ? true
    : `These browser names/aliases already exist: ${found.join(", ")} `;
}

async function addBrowserToConfig(
  browser: BrowserObject,
  isDefault: boolean
): Promise<void> {
  const config = await getConfigData();
  let defaults = await getDefaultsData();
  const browsers = await getBrowsersData();

  browsers.push(browser);

  if (isDefault) {
    defaults = {
      ...defaults,
      browser: browser.name,
    };
  }

  const json = JSON.stringify({ ...config, defaults, browsers });
  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }

    emptyLine();
  });
}

export default async function addBrowser(): Promise<boolean> {
  const browserName = await text(
    `Provide the ${chalk.yellow("browser's name")}:\n`,
    async (value) => await isValidBrowserName(value)
  );
  emptyLine();

  if (browserName == null) {
    return false;
  }

  const aliasList = await text(
    `List 0 or more aliases for ${chalk.yellow(
      getChoiceTitle(browserName)
    )} ${chalk.italic.cyanBright("(space or comma separated)")}\n`,
    async (value) => await isValidAlias(value, browserName)
  );

  const alias: string[] | undefined =
    aliasList != null ? getChoiceArray(aliasList) : undefined;

  if (alias != null) {
    const browser: BrowserObject = {
      name: browserName,
      alias,
    };

    let isDefault = true;
    const defaults = (await getDefaultsData()) ?? {};

    if (defaults?.browser != null) {
      emptyLine();
      isDefault = await toggle(
        `Should "${getChoiceTitle(browserName)}" be the default browser?\n`,
        false
      );
    }

    await addBrowserToConfig(browser, isDefault);
    return true;
  }

  return false;
}
