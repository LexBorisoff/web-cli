import * as fs from "fs";
import getFileName from "./getFileName";
import { ConfigFileType } from "../../../types/config.types";

export default function fileExists(type: ConfigFileType): boolean {
  const fileName = getFileName(type);
  return fs.existsSync(fileName);
}
