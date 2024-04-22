import * as fs from "node:fs";
import { getConfigFilePath } from "../../helpers/config/get-config-path.js";
import { ConfigFileData } from "../../types/config.types.js";

export function writeConfigFile(data: ConfigFileData) {
  const configFile = getConfigFilePath();
  const space = 2;
  fs.writeFileSync(configFile, JSON.stringify(data, null, space), {
    flag: "w",
  });
}
