import chalk from "chalk";
import setupInitialConfig from "./setupInitialConfig";
import { getDefaultsData } from "../../data";
import getConfigArgs from "../../command/getConfigArgs";
import { writeFile, hasData } from "../../helpers/config";
import { cliPrompts } from "../../helpers/prompts";
import { printBanner, printError } from "../../helpers/print";

const { force } = getConfigArgs();
const { toggle } = cliPrompts;

export default async function setupConfig(): Promise<void> {
  let continueToSetup: boolean | undefined = !hasData("config") || force;
  let overrideAttempt = false;

  if (!continueToSetup) {
    overrideAttempt = true;
    continueToSetup = await toggle(
      `${chalk.yellowBright(
        `This will ${chalk.bold.italic.cyanBright(
          "override"
        )} the existing config file.`
      )} ${chalk.cyanBright("Proceed")}?\n`,
      false
    );

    if (continueToSetup == null) {
      printError("\nAborted!\n");
      return;
    }
  }

  if (continueToSetup) {
    printBanner("Let's set up browser config", "header", "info");

    const config = await setupInitialConfig();
    if (config != null) {
      const { browsers, defaultBrowser } = config;
      const defaults = getDefaultsData();

      try {
        writeFile("config", {
          defaults: {
            ...defaults,
            browser: defaultBrowser,
          },
          browsers,
        });

        printBanner("You are good to go. Have fun!", "footer", "success");
      } catch (error) {
        printBanner("Couldn't create the config file :(", "footer", "error");
      }
    } else {
      printBanner(
        `Browser config was not ${overrideAttempt ? "overridden" : "created"}.`,
        "footer",
        "error"
      );
    }
  }
}
