import * as fs from "fs";
import getSettings from "./getSettings";
import configFileExists from "./configFileExists";

const { linkedPath } = getSettings() ?? {};

export default function readConfigFile(): string | null {
  // checking if file exists because linkedPath might be outdated
  // and point to a file that was moved, renamed, or deleted
  if (linkedPath == null || !configFileExists()) {
    return null;
  }

  try {
    return fs.readFileSync(linkedPath, { encoding: "utf-8" });
  } catch {
    return null;
  }
}
