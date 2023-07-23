import * as fs from "fs";
import getLink from "./getLink";
import fileExists from "./fileExists";

const configLink = getLink();

export default function readFile(): string | null {
  // checking if file exists because configLink might be outdated
  // and point to a file that was moved, renamed, or deleted
  if (configLink == null || !fileExists()) {
    return null;
  }

  try {
    return fs.readFileSync(configLink, { encoding: "utf-8" });
  } catch {
    return null;
  }
}
