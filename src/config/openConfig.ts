import open from "open";
import chalk from "chalk";
import { getFileName, fileExists } from "../helpers/config/file";
import { print, printError } from "../helpers/print";
import getConfigArgs from "../command/getConfigArgs";

const configFile = getFileName("config");
const { _: args } = getConfigArgs();

export default function openConfig() {
  if (!fileExists("config")) {
    printError("Config file is not set up.");
    print(
      `Use the ${chalk.italic.cyanBright(
        `"--config setup"`
      )} command to create a config file.`
    );
    return;
  }

  if (configFile != null) {
    if (args.length > 1) {
      const [, ...apps] = args;
      apps.forEach((app) => {
        if (typeof app === "string") {
          open(configFile, { app: { name: app } });
        }
      });
    } else {
      open(configFile);
    }
  }
}
