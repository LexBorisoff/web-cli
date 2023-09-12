import * as fs from "fs";
import { getConfigFilePath } from "./getConfigPath";
import { ConfigValue } from "../../command/options";

export default function readConfigFile(
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
