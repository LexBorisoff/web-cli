import setupInitialConfig from "./setupInitialConfig";
import createConfigFile from "./createConfigFile";
import { getDefaultsData } from "../../data";
import { printHeader } from "../../helpers/print";

export default async function setupConfig(): Promise<void> {
  printHeader("Let's set up browser config", "info");

  const config = await setupInitialConfig();
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

      printHeader("You are good to go. Have fun!", "success");
    } catch (error) {
      printHeader("Couldn't create the config file :(", "error");
      console.error(error);
    }
  } else {
    printHeader("Browser config was not created", "error");
  }
}
