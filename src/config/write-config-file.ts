import * as fs from "node:fs";
import type { ConfigDataDto } from "../types/config.types.js";
import { getConfigFilePath } from "../helpers/config/get-config-path.js";

export function writeConfigFile(data: ConfigDataDto): void {
  const configFile = getConfigFilePath();
  const space = 2;
  fs.writeFileSync(configFile, JSON.stringify(data, null, space), {
    flag: "w",
  });
}
