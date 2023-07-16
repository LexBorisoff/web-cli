import * as fs from "fs";
import getFileName from "./getFileName";
import fileExists from "./fileExists";

export default function readFile(): string | null {
  const fileName = getFileName();
  return fileExists() ? fs.readFileSync(fileName, { encoding: "utf-8" }) : null;
}
