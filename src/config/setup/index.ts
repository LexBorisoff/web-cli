import chalk from "chalk";
import setupInitialConfig from "./setupInitialConfig";
import { getDefaultsData } from "../../data";
import getConfigArgs from "../../command/getConfigArgs";
import { writeFile, fileExists } from "../../helpers/config";
import { cliPrompts } from "../../helpers/prompts";
import { printBanner } from "../../helpers/print";

const { force } = getConfigArgs();
const { toggle } = cliPrompts;

export default async function setupConfig(): Promise<void> {
  let continueToSetup = !fileExists("config") || force;
  if (!continueToSetup) {
    continueToSetup = await toggle(
      `${chalk.yellow(
        "This will override the existing config file."
      )} Continue?\n`,
      false
    );
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
        console.error(error);
      }
    } else {
      printBanner("Browser config was not created", "footer", "error");
    }
  }
}
