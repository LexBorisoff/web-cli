import prompts from "prompts";
import chalk from "chalk";
import { emptyLine } from "../helpers";
import { BrowsersConfig } from "../types";

interface Choice {
  title: string;
  value: string;
}

interface Answer<T> {
  answer?: T;
}

// HELPERS
function getBrowserTitle(browser: string): string {
  return `${browser[0].toUpperCase()}${browser.substring(1)}`;
}

function getBrowserChoices(browsers: string[]): Choice[] {
  return browsers.map((browser) => ({
    title: getBrowserTitle(browser),
    value: browser,
  }));
}

function validate(value: string): true | string {
  return /^[A-Za-z,\s]+$/.test(value)
    ? true
    : "Only letters and separators are allowed!";
}

async function keepGoing(message: string, initial: boolean): Promise<boolean> {
  const { answer: keepGoing }: Answer<boolean> = await prompts({
    name: "answer",
    type: "toggle",
    message,
    active: "yes",
    inactive: "no",
    initial,
  });

  return !!keepGoing;
}

async function selectBrowsers(
  choices: Choice[],
  message: string
): Promise<string[] | undefined> {
  const { answer: selectedBrowsers }: Answer<string[]> = await prompts({
    name: "answer",
    type: "multiselect",
    choices,
    message,
    instructions: false,
    hint: "- Space/←/→ to toggle selection. Enter to submit.",
  });

  return selectedBrowsers;
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
  const { answer }: Answer<string> = await prompts({
    name: "answer",
    type: "text",
    message,
    validate,
  });

  return answer;
}

// MAIN FUNCTIONS
async function getKnownBrowsers(): Promise<string[] | undefined> {
  const choices = getBrowserChoices([
    "chrome",
    "firefox",
    "edge",
    "brave",
    "opera",
    "safari",
  ]);

  return await selectBrowsers(
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

async function getDefaultBrowser(
  browsers: string[]
): Promise<string | undefined> {
  if (browsers.length === 1) {
    return browsers[0];
  }

  const choices = getBrowserChoices(browsers);
  const { answer }: Answer<string> = await prompts({
    type: "select",
    name: "answer",
    message: `What should be the ${chalk.yellow("default browser")}?\n`,
    choices,
  });

  return answer;
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

    const choices = getBrowserChoices(browsers);
    const selectedBrowsers = await selectBrowsers(
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
            getBrowserTitle(selected)
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
    const defaultBrowser = await getDefaultBrowser(browserList);
    emptyLine();

    if (defaultBrowser != null) {
      const browsers = await getAliases(browserList);
      return { browsers, defaultBrowser };
    }
  }

  return undefined;
}
