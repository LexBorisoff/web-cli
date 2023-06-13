import * as fs from "fs";
import getFileName from "./getFileName";
import fileExists from "./fileExists";
import { ConfigFileType } from "../../../types/config.types";

export default function readFile(type: ConfigFileType): string {
  const fileName = getFileName(type);
  return fileExists(type)
    ? fs.readFileSync(fileName, { encoding: "utf-8" })
    : "";
}
