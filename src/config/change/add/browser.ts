import chalk from "chalk";
import { getConfigData, getBrowsersData, getDefaultsData } from "../../../data";
import { getBrowserAliases } from "../../../helpers/browser";
import { writeFile } from "../../../helpers/config";
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

function validateBrowserName(value: string): boolean | string {
  const browserName = value.trim().toLocaleLowerCase();
  if (!namePattern.test(browserName)) {
    return "Invalid browser name";
  }

  const browsers = getBrowsersData();
  if (browsers.length > 0) {
    const browserNames = browsers.map((browser) =>
      typeof browser === "string" ? browser : browser.name
    );

    const found = browserNames.find(
      (browser) => browser.toLowerCase() === browserName
    );
    if (found != null) {
      return `${getTitle(found)} already exists`;
    }
  }

  return true;
}

function validateAlias(aliases: string, browserName: string): boolean | string {
  const list = getUniqueArrayLowerCase(aliases);
  if (list.includes(browserName.toLowerCase())) {
    return "Alias must differ from the browser name";
  }

  if (list.find((alias) => !lettersNumbersPattern.test(alias)) != null) {
    return "Only letters and numbers are allowed";
  }

  const browsers = getBrowsersData();
  if (browsers.length === 0) {
    return true;
  }

  const browserNames = browsers.map((browser) =>
    typeof browser === "string" ? browser : browser.name
  );
  const browsersConfig = getBrowsersData();
  const browserAliases = getBrowserAliases(browsersConfig);
  const found = findExistingValues(list, [...browserNames, ...browserAliases]);

  return found.length === 0
    ? true
    : `These browser names/aliases already exist: ${found.join(", ")}`;
}

interface AddToConfigProps {
  browser: BrowserObject;
  isDefault: boolean;
}
function addToConfig({ browser, isDefault }: AddToConfigProps): void {
  const config = getConfigData();
  let defaults = getDefaultsData();
  const browsers = getBrowsersData();

  browsers.push(browser);

  if (isDefault) {
    defaults = {
      ...defaults,
      browser: browser.name,
    };
  }

  writeFile("config", {
    ...config,
    defaults,
    browsers,
  });
}

export default async function addBrowser(): Promise<boolean> {
  answer.browserName = await text(
    `Provide the ${chalk.yellowBright("browser's name")}:\n`,
    (value) => validateBrowserName(value)
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
    (value) => validateAlias(value, browserName)
  );

  const alias: string[] | undefined =
    answer.alias != null ? getUniqueArrayLowerCase(answer.alias) : undefined;

  if (alias != null) {
    const browser: BrowserObject = {
      name: browserName,
      alias,
    };

    let isDefault: boolean | undefined = true;
    const browsers = getBrowsersData();

    if (browsers.length > 0) {
      emptyLine();
      isDefault = await toggle(
        `Should "${getTitle(browser.name)}" be the ${chalk.yellowBright(
          "default browser"
        )}?\n`,
        false
      );

      if (isDefault == null) {
        return false;
      }
    }

    addToConfig({ browser, isDefault });
    return true;
  }

  return false;
}
