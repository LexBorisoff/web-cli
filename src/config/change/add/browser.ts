import chalk from "chalk";
import { getConfigData, getBrowsersData, getDefaultsData } from "../../../data";
import { getBrowserAliases } from "../../../helpers/browser";
import { writeConfigFile } from "../../../helpers/config";
import {
  cliPrompts,
  getTitle,
  getUniqueArrayLowerCase,
} from "../../../helpers/prompts";
import { namePattern, lettersNumbersPattern } from "../../../helpers/patterns";
import { emptyLine } from "../../../helpers/print";
import findExistingValues from "../../../helpers/findExistingValues";
import { BrowserObject } from "../../../types/data.types";
import { TextAnswer } from "../../../types/config.types";

const { text, toggle } = cliPrompts;
const answer: TextAnswer = {};

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

async function validateAlias(
  aliases: string,
  browserName: string
): Promise<boolean | string> {
  const list = getUniqueArrayLowerCase(aliases);
  if (list.includes(browserName.toLowerCase())) {
    return "Alias must differ from the browser name";
  }

  if (list.find((alias) => !lettersNumbersPattern.test(alias)) != null) {
    return "Only letters and numbers are allowed.";
  }

  const browsers = await getBrowsersData();
  if (browsers.length === 0) {
    return true;
  }

  const browserNames = browsers.map((browser) =>
    typeof browser === "string" ? browser : browser.name
  );
  const browsersConfig = await getBrowsersData();
  const browserAliases = getBrowserAliases(browsersConfig);
  const found = findExistingValues(list, [...browserNames, ...browserAliases]);

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

  writeConfigFile({ ...config, defaults, browsers });
}

export default async function addBrowser(): Promise<boolean> {
  answer.browserName = await text(
    `Provide the ${chalk.yellowBright("browser's name")}:\n`,
    async (value) => await validateBrowserName(value)
  );

  if (answer.browserName == null) {
    return false;
  }

  const browserName = answer.browserName.trim().toLowerCase();

  emptyLine();
  answer.alias = await text(
    `List 0 or more aliases for ${chalk.yellowBright(
      getTitle(browserName)
    )} ${chalk.italic.cyanBright("(space or comma separated)")}\n`,
    async (value) => await validateAlias(value, browserName)
  );

  const alias: string[] | undefined =
    answer.alias != null ? getUniqueArrayLowerCase(answer.alias) : undefined;

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
