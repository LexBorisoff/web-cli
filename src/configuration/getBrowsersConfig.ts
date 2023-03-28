import chalk from "chalk";
import {
  emptyLine,
  getChoiceTitle,
  getArray,
  select,
  multiselect,
  keepGoing,
  getText,
} from "../helpers";
import { BrowsersConfig } from "../types";

async function getKnownBrowsers(): Promise<string[] | undefined> {
  return await multiselect(
    ["chrome", "firefox", "edge", "brave", "opera", "safari"],
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

    const selectedBrowsers = await multiselect(
      browsers,
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
