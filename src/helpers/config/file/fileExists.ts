import * as fs from "fs";
import getLink from "./getLink";

export default function fileExists(): boolean {
  const configPath = getLink();
  return configPath != null && fs.existsSync(configPath);
}
