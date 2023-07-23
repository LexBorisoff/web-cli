import * as fs from "fs";
import getLink from "./getLink";

export default function fileExists(): boolean {
  const configLink = getLink();
  return configLink != null && fs.existsSync(configLink);
}
