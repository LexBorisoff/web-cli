import open from "open";
import getConfigArgs from "../../command/getConfigArgs";
import { getFileName, fileExists, writeFile } from "../../helpers/config/file";

const configFile = getFileName("config");
const { _: args } = getConfigArgs();

export default function openConfig() {
  if (!fileExists("config")) {
    printError("Config file is not set up.");
    print(
      `Use ${chalk.italic.cyanBright(
        `"--config setup"`
      )} to create a config file.\n`
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
