import open from "open";
import * as fs from "fs";
import getConfigArgs from "../command/getConfigArgs";
import { getSettings } from "../helpers/config";
import { print, printError, emptyLine } from "../helpers/print";

const { _: args } = getConfigArgs();
const configLink = getSettings()?.link;

async function openFile(): Promise<void> {
  if (configLink != null) {
    if (!fs.existsSync(configLink)) {
      printError("Could not access the linked config file:");
      print(configLink);
      emptyLine();
      return;
    }

    const [, ...apps] = args;
    if (apps.length > 0) {
      apps.map((app) => {
        if (typeof app === "string") {
          open(configLink, { app: { name: app } });
        }
      });
    } else {
      await open(configLink);
    }
  }
}

export default openFile;
