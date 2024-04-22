import * as fs from "node:fs";
import { getConfigFilePath } from "./get-config-path.js";

export function readConfigFile(): string | null {
  const filePath = getConfigFilePath();
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return fs.readFileSync(filePath, { encoding: "utf-8" });
  } catch {
    return null;
  }
}
