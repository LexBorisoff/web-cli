import * as fs from "fs";
import getFileName from "./getFileName";
import fileExists from "./fileExists";
import { ConfigFileType } from "../../../types/config.types";

export default function readFile(fileType: ConfigFileType): string | null {
  const fileName = getFileName(fileType);
  return fileExists(fileType) && fileName != null
    ? fs.readFileSync(fileName, { encoding: "utf-8" })
    : null;
}
