import * as path from "path";
import { ConfigFileType } from "../../../types/config.types";

export default function getFileName(fileType: ConfigFileType) {
  if (fileType === "engines") {
    return path.resolve(`${__dirname}/../../../engines.json`);
  }

  return path.resolve(`${__dirname}/../../../config.json`);
}
