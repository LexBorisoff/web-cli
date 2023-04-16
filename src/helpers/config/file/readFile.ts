import * as fs from "fs";
import { getConfigFileName, getEnginesFileName } from "./getFileName";

const configFileName = getConfigFileName();
const enginesFileName = getEnginesFileName();

export function readConfigFile(): string {
  return fs.readFileSync(configFileName, "utf-8");
}

export function readEnginesFile(): string {
  return fs.readFileSync(enginesFileName, { encoding: "utf-8" });
}
