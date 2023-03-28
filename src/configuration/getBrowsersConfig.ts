import prompts from "prompts";
import chalk from "chalk";
import {
  emptyLine,
  getChoiceTitle,
  getChoices,
  select,
  multiselect,
} from "../helpers";
import { BrowsersConfig, PromptAnswer } from "../types";

// HELPERS
function validate(value: string): true | string {
  return /^[A-Za-z,\s]+$/.test(value)
    ? true
    : "Only letters and separators are allowed!";
}

async function keepGoing(message: string, initial: boolean): Promise<boolean> {
  const { answer: keepGoing }: PromptAnswer<boolean> = await prompts({
    name: "answer",
    type: "toggle",
    message,
    active: "yes",
    inactive: "no",
    initial,
  });

  return !!keepGoing;
}

function getArray(reply: string): string[] {
  const browsers = reply
    .trim()
    .split(/\s+|,+/)
    .filter((r) => r !== "")
    .map((r) => r.toLowerCase());

  return [...new Set(browsers)];
}

async function getText(message: string): Promise<string | undefined> {
  const { answer }: PromptAnswer<string> = await prompts({
    name: "answer",
    type: "text",
    message,
    validate,
  });

  return answer;
}

// MAIN FUNCTIONS
async function getKnownBrowsers(): Promise<string[] | undefined> {
  const choices = getChoices([
    "chrome",
    "firefox",
    "edge",
    "brave",
    "opera",
    "safari",
  ]);

  return await multiselect(
    choices,
    `What ${chalk.yellow("browser(s)")} do you have installed?\n`
  );
}

async function getExtraBrowsers(): Promise<string[]> {
  const yes = await keepGoing(
    `Are there browsers you use that were ${chalk.italic.yellow(
      "not in the list"
    )}?\n`,
    false
  );

  if (yes) {
    emptyLine();

    const browsers = await getText(
      `List ${chalk.yellow(
        "other browsers"
      )} you want to add ${chalk.italic.gray("(space or comma separated)")}\n`
    );

    return browsers != null ? getArray(browsers) : [];
  }

  return [];
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

async function getAliases(browsers: string[]): Promise<BrowsersConfig> {
  const yes = await keepGoing(
    `Do you want to set ${chalk.yellow(
      "browser aliases"
    )} (e.g. short names)?\n`,
    true
  );

  if (yes) {
    emptyLine();

    const choices = getChoices(browsers);
    const selectedBrowsers = await multiselect(
      choices,
      "Choose browser(s) to add aliases for\n"
    );

    if (selectedBrowsers != null) {
      const browsersConfig: BrowsersConfig = browsers.filter(
        (browser) => !selectedBrowsers.find((selected) => selected === browser)
      );

      for (let i = 0; i < selectedBrowsers.length; i++) {
        emptyLine();

        const selected = selectedBrowsers[i];
        const list = await getText(
          `List 1 or more aliases for ${chalk.yellow(
            getChoiceTitle(selected)
          )} ${chalk.italic.gray("(space or comma separated)")}\n`
        );

        const alias = list != null ? getArray(list) : [];
        browsersConfig.push(
          alias.length > 0 ? { name: selected, alias } : selected
        );
      }

      return browsersConfig;
    }
  }

  return browsers;
}

interface ReturnConfig {
  browsers: BrowsersConfig;
  defaultBrowser: string;
}

export default async function getBrowsersConfig(): Promise<
  ReturnConfig | undefined
> {
  const browserList = await getBrowserList();
  emptyLine();

  if (browserList.length > 0) {
    const defaultBrowser = await select(
      browserList,
      `What should be the ${chalk.yellow("default browser")}?\n`
    );
    emptyLine();

    if (defaultBrowser != null) {
      const browsers = await getAliases(browserList);
      return { browsers, defaultBrowser };
    }
  }

  return undefined;
}
