import * as path from "path";
import { ConfigFileType } from "../../../types/config.types";

export default function getFileName(fileType: ConfigFileType): string | null {
  switch (fileType) {
    case "config":
      return path.resolve(`${__dirname}/../../../config.json`);
    case "engines":
      return path.resolve(`${__dirname}/../../../engines.json`);
    default:
      return null;
  }
}
