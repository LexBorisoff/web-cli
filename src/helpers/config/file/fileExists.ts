import * as fs from "fs";
import getFileName from "./getFileName";

export default function fileExists(): boolean {
  return fs.existsSync(getFileName());
}
