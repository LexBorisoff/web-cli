import chalk from "chalk";
import { cliPrompts, getTitle, getArray } from "../../helpers/prompts";
import { emptyLine } from "../../helpers/print";
import { InitialConfig } from "../../types/config.types";
import { BrowsersConfig, BrowserObject } from "../../types/data.types";

const { text, toggle, select, multiselect } = cliPrompts;

async function getKnownBrowsers(): Promise<string[] | undefined> {
  return multiselect(
    ["chrome", "firefox", "edge", "brave", "opera", "safari"],
    `What ${chalk.yellow("browser(s)")} do you have installed?\n`
  );
}

async function getExtraBrowsers(): Promise<string[] | undefined> {
  const keepGoing = await toggle(
    `Are there browsers you use that were ${chalk.italic.yellow(
      "not in the list"
    )}?\n`,
    false
  );

  if (keepGoing == null) {
    return undefined;
  }

  if (keepGoing) {
    emptyLine();

    const browsers = await text(
      `List ${chalk.yellow(
        "other browsers"
      )} you want to add ${chalk.italic.cyanBright(
        "(space or comma separated)"
      )}\n`
    );

    return browsers != null ? getArray(browsers) : [];
  }

  return [];
}

async function getBrowserList(): Promise<string[] | undefined> {
  const knownBrowsers = await getKnownBrowsers();

  if (knownBrowsers == null) {
    return undefined;
  }

  emptyLine();
  const extraBrowsers = await getExtraBrowsers();
  if (extraBrowsers == null) {
    return undefined;
  }

  if (extraBrowsers.length > 0) {
    return [...new Set([...knownBrowsers, ...extraBrowsers])];
  }

  return [...new Set(knownBrowsers)];
}

async function getAliases(browsers: string[]): Promise<BrowsersConfig> {
  const browsersConfig: BrowsersConfig<BrowserObject> = browsers.map(
    (name) => ({
      name,
      alias: [],
    })
  );

  const keepGoing = await toggle(
    `Do you want to set ${chalk.yellow(
      "browser aliases"
    )} (e.g. short names)?\n`,
    true
  );

  if (keepGoing) {
    let selectedBrowsers: string[] | undefined = [...browsers];
    if (browsers.length > 1) {
      emptyLine();
      selectedBrowsers = await multiselect(
        browsers,
        "Select browsers to add aliases for\n"
      );
    }

    if (selectedBrowsers != null) {
      for (let i = 0; i < selectedBrowsers.length; i++) {
        emptyLine();

        const selected = selectedBrowsers[i];
        const list = await text(
          `List 1 or more aliases for ${chalk.yellow(
            getTitle(selected)
          )} ${chalk.italic.cyanBright("(space or comma separated)")}\n`
        );

        const alias = list != null ? getArray(list) : [];
        const index = browsersConfig.findIndex(({ name }) => name == selected);
        if (index >= 0) {
          browsersConfig[index] = { name: selected, alias };
        }
      }
    }
  }

  return browsersConfig;
}

export default async function setupInitialConfig(): Promise<
  InitialConfig | undefined
> {
  const browserList = await getBrowserList();

  if (browserList == null || browserList.length === 0) {
    return undefined;
  }

  let defaultBrowser: string | undefined = browserList[0];
  if (browserList.length > 1) {
    emptyLine();
    defaultBrowser = await select(
      browserList,
      `What should be the ${chalk.yellow("default browser")}?\n`
    );
  }

  if (defaultBrowser == null) {
    return undefined;
  }

  emptyLine();
  const browsers = await getAliases(browserList);
  return { browsers, defaultBrowser };
}
