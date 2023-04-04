import * as fs from "fs";
import chalk from "chalk";
import { getConfigData, getBrowsersData, getDefaultsData } from "../../../data";
import getConfigFileName from "../../../helpers/getConfigFileName";
import { cliPrompts, getTitle, getArray } from "../../../helpers/prompts";
import emptyLine from "../../../helpers/emptyLine";
import { namePattern } from "../../../helpers/patterns";
import { BrowserObject } from "../../../types/config.types";
import { TextAnswer } from "../../../types/setup.types";

const { text, toggle } = cliPrompts;
const answer: TextAnswer = {};

const configFileName = getConfigFileName();

async function validateBrowserName(value: string): Promise<boolean | string> {
  const browserName = value.trim().toLocaleLowerCase();
  if (!namePattern.test(browserName)) {
    return "Invalid browser name";
  }

  const browsers = await getBrowsersData();
  if (browsers.length > 0) {
    const browserNames = browsers.map((browser) =>
      typeof browser === "string" ? browser : browser.name
    );

    const found = browserNames.find(
      (browser) => browser.toLowerCase() === browserName
    );
    if (found != null) {
      return `${getTitle(found)} already exist`;
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
  const list = getArray(aliases);
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

interface AddToConfigProps {
  browser: BrowserObject;
  isDefault: boolean;
}
async function addToConfig({
  browser,
  isDefault,
}: AddToConfigProps): Promise<void> {
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
  });
}

export default async function addBrowser(): Promise<boolean> {
  answer.browserName = await text(
    `Provide the ${chalk.yellow("browser's name")}:\n`,
    async (value) => await validateBrowserName(value)
  );
  emptyLine();

  if (answer.browserName == null) {
    return false;
  }

  const browserName = answer.browserName.trim().toLowerCase();
  answer.alias = await text(
    `List 0 or more aliases for ${chalk.yellow(
      getTitle(browserName)
    )} ${chalk.italic.cyanBright("(space or comma separated)")}\n`,
    async (value) => await isValidAlias(value, browserName)
  );

  const alias: string[] | undefined =
    answer.alias != null ? getArray(answer.alias) : undefined;

  if (alias != null) {
    const browser: BrowserObject = {
      name: browserName,
      alias,
    };

    let isDefault = true;
    const browsers = await getBrowsersData();

    if (browsers.length > 0) {
      emptyLine();
      isDefault = await toggle(
        `Should "${getTitle(browser.name)}" be the default browser?\n`,
        false
      );
    }

    await addToConfig({ browser, isDefault });
    return true;
  }

  return false;
}
