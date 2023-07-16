import open from "open";
import getConfigArgs from "./command/getConfigArgs";
import { getFileName, fileExists, setupInitialConfig } from "./helpers/config";

const configFile = getFileName();
const { _: args } = getConfigArgs();

async function config(): Promise<void> {
  if (!fileExists()) {
    setupInitialConfig();
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
