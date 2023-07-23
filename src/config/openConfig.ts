import open from "open";
import getConfigArgs from "../command/getConfigArgs";
import { getPath } from "../helpers/config";

const { _: args } = getConfigArgs();

async function openFile(): Promise<void> {
  const configPath = getPath();

  if (configPath != null) {
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
