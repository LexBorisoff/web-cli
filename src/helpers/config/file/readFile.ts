import * as fs from "fs";
import getFileName from "./getFileName";
import fileExists from "./fileExists";
import { ConfigFileType } from "../../../types/config.types";

export default function readFile(fileType: ConfigFileType): string {
  const fileName = getFileName(fileType);
  return fileExists(fileType)
    ? fs.readFileSync(fileName, { encoding: "utf-8" })
    : "";
}
