import setupInitialConfig from "./setupInitialConfig";
import createConfigFile from "./createConfigFile";
import { getDefaultsData } from "../../data";
import printTitle from "../../helpers/printTitle";
import emptyLine from "../../helpers/emptyLine";

export default async function setupConfig(): Promise<void> {
  printTitle("Let's set up browser config", "info");
  emptyLine();

  const config = await setupInitialConfig();
  emptyLine();

  if (config != null) {
    const { browsers, defaultBrowser } = config;
    const defaults = await getDefaultsData();

    try {
      createConfigFile({
        defaults: {
          ...defaults,
          browser: defaultBrowser,
        },
        browsers,
      });

      printTitle("You are good to go. Have fun!", "success");
    } catch (error) {
      printTitle("Couldn't create the config file :(", "error");
      console.error(error);
    }
  } else {
    printTitle("Browser config was not created", "error");
  }
  emptyLine();
}
