import open from "open";
import getConfigArgs from "../../command/getConfigArgs";
import { getFileName, fileExists, writeFile } from "../../helpers/config/file";

const configFile = getFileName("config");
const { _: args } = getConfigArgs();

export default function openConfig() {
  if (!fileExists("config")) {
    writeFile("config", "");
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
