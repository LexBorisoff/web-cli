import open from "open";
import getConfigArgs from "./command/getConfigArgs";
import { getFileName, fileExists, writeFile } from "./helpers/config/file";

const configFile = getFileName("config");
const { _: args } = getConfigArgs();

async function config(): Promise<void> {
  if (!fileExists("config")) {
    writeFile("config", "");
  }

  if (configFile != null) {
    if (args.length > 0) {
      await Promise.all(
        args.map((app) => {
          if (typeof app === "string") {
            open(configFile, { app: { name: app } });
          }
        })
      );
    } else {
      await open(configFile);
    }
  }
}

export default config;
