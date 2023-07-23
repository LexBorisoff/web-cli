import * as fs from "fs";
import getSettings from "./getSettings";
import configFileExists from "./configFileExists";

const configLink = getSettings()?.link;

export default function readConfigFile(): string | null {
  // checking if file exists because configLink might be outdated
  // and point to a file that was moved, renamed, or deleted
  if (configLink == null || !configFileExists()) {
    return null;
  }

  try {
    return fs.readFileSync(configLink, { encoding: "utf-8" });
  } catch {
    return null;
  }
}
