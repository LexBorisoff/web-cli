import open from "open";
import * as fs from "fs";
import getConfigArgs from "./command/getConfigArgs";
import { getFileName, fileExists } from "./helpers/config/file";

const configFile = getFileName();
const { _: args } = getConfigArgs();

async function config(): Promise<void> {
  if (!fileExists()) {
    fs.writeFileSync(getFileName(), "");
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
