import chalk from "chalk";
import setupInitialConfig from "./setupInitialConfig";
import { getDefaultsData } from "../../data";
import getConfigArgs from "../../command/getConfigArgs";
import { writeFile, hasData } from "../../helpers/config";
import { cliPrompts } from "../../helpers/prompts";
import { printBanner, printError, emptyLine } from "../../helpers/print";

const { force } = getConfigArgs();
const { toggle } = cliPrompts;

export default async function setupConfig(): Promise<void> {
  let continueToSetup: boolean | undefined = !hasData("config") || force;
  let overrideAttempt = false;

  if (!continueToSetup) {
    overrideAttempt = true;
    continueToSetup = await toggle(
      `${chalk.yellowBright("Override")} the existing config?\n`,
      false
    );

    if (!continueToSetup) {
      emptyLine();
      printError("Aborted!");
      emptyLine();
      return;
    }
  }

  printBanner("Let's set up browser config", "header", "info");

  const config = await setupInitialConfig();

  if (config == null) {
    printBanner(
      `Browser config was not ${overrideAttempt ? "overridden" : "created"}`,
      "footer",
      "error"
    );
    return;
  }

  const { browsers, defaultBrowser } = config;
  const defaults = getDefaultsData();

  writeFile("config", {
    defaults: {
      ...defaults,
      browser: defaultBrowser,
    },
    browsers,
  });

  printBanner("Great Success!", "footer", "success");
}
