import * as fs from "fs";
import { getConfigFileName, getEnginesFileName } from "./getFileName";

const configFileName = getConfigFileName();
const fileName = getEnginesFileName();

export function configFileExists(): boolean {
  return fs.existsSync(configFileName);
}

export function enginesFileExists(): boolean {
  return fs.existsSync(fileName);
}
