import * as fs from "fs";
import { getEnginesFileName } from "./getFileName";

const fileName = getEnginesFileName();

export function readEnginesFile(): string {
  return fs.readFileSync(fileName, { encoding: "utf-8" });
}

export function enginesFileExists(): boolean {
  return fs.existsSync(fileName);
}

export function hasEngines(): boolean {
  if (!enginesFileExists()) {
    return false;
  }

  const data = readEnginesFile();
  if (data === "") {
    return false;
  }

  const engines = JSON.parse(data);
  return engines instanceof Object ? Object.keys(engines).length > 0 : false;
}
