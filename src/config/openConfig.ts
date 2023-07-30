import open from "open";
import * as fs from "fs";
import { getConfigArgs } from "../command/args";
import { getSettings } from "../helpers/config";
import { print, printError } from "../helpers/print";

const { _: args } = getConfigArgs();
const { linkedPath } = getSettings() ?? {};

function openFile(): void {
  if (linkedPath != null) {
    if (!fs.existsSync(linkedPath)) {
      printError("Could not access the linked config file:");
      print(linkedPath);
      return;
    }

    const [, ...apps] = args;
    if (apps.length > 0) {
      apps.map((app) => {
        if (typeof app === "string") {
          open(linkedPath, { app: { name: app } });
        }
      });
    } else {
      open(linkedPath);
    }
  }
}

export default openFile;
