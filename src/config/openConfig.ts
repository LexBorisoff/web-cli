import open from "open";
import * as fs from "fs";
import getConfigArgs from "../command/getConfigArgs";
import { getLink } from "../helpers/config";
import { print, printError, emptyLine } from "../helpers/print";

const { _: args } = getConfigArgs();

async function openFile(): Promise<void> {
  const configPath = getLink();

  if (configPath != null) {
    if (!fs.existsSync(configPath)) {
      printError("Could not access the linked config file:");
      print(configPath);
      emptyLine();
      return;
    }

    const [, ...apps] = args;
    if (apps.length > 0) {
      apps.map((app) => {
        if (typeof app === "string") {
          open(configPath, { app: { name: app } });
        }
      });
    } else {
      await open(configPath);
    }
  }
}

export default openFile;
