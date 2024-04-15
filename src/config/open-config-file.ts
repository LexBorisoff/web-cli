import * as fs from "node:fs";
import open from "open";
import { getConfigArgs } from "../command/args/get-config-args.js";

const { _: apps } = getConfigArgs();

export function openConfigFile(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    return;
  }

  if (apps.length > 0) {
    apps.map((app) => {
      if (typeof app === "string") {
        open(filePath, { app: { name: app } });
      }
    });
  } else {
    open(filePath);
  }
}
