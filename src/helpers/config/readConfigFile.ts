import * as fs from "fs";
import { getConfigFilePath } from "./getConfigPath";
import { ConfigOption } from "../../command/options";

export default function readConfigFile(
  configOption: ConfigOption.Browsers | ConfigOption.Engines
): string | null {
  const filePath = getConfigFilePath(configOption);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return fs.readFileSync(filePath, { encoding: "utf-8" });
  } catch {
    return null;
  }
}
