import * as fs from "node:fs";

/**
 * Returns empty string if file does not exist or cannot be read
 */
export function readFile(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  try {
    return fs.readFileSync(filePath, { encoding: "utf-8" });
  } catch {
    return "";
  }
}
