import * as fs from "node:fs";
import { getConfigDirPath } from "../../helpers/config/get-config-path.js";

export function createConfigDir() {
  const configDir = getConfigDirPath();
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }
}
