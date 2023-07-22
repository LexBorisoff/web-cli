import * as fs from "fs";
import getPath from "./getPath";
import fileExists from "./fileExists";

export default function readFile(): string | null {
  const configPath = getPath();

  // checking if file exists because configPath might be outdated
  // and point to a file that was moved, renamed, or deleted
  if (configPath == null || !fileExists()) {
    return null;
  }

  try {
    return fs.readFileSync(configPath, { encoding: "utf-8" });
  } catch {
    return null;
  }
}
