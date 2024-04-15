import * as fs from "node:fs";
import { ConfigValue } from "../../command/options.js";
import { getConfigFilePath } from "./get-config-path.js";

export function readConfigFile(
  configType: ConfigValue.Browsers | ConfigValue.Engines
): string | null {
  const filePath = getConfigFilePath(configType);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return fs.readFileSync(filePath, { encoding: "utf-8" });
  } catch {
    return null;
  }
}
