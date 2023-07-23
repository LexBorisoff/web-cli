import * as fs from "fs";
import getPath from "./getPath";

export default function fileExists(): boolean {
  const configPath = getPath();
  return configPath != null && fs.existsSync(configPath);
}
