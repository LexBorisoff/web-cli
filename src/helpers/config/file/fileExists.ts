import * as fs from "fs";
import getFileName from "./getFileName";
import { ConfigFileType } from "../../../types/config.types";

export default function fileExists(fileType: ConfigFileType): boolean {
  const fileName = getFileName(fileType);
  return fs.existsSync(fileName);
}
