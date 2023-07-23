import * as fs from "fs";
import getConfigLink from "./getConfigLink";

export default function configFileExists(): boolean {
  const configLink = getConfigLink();
  return configLink != null && fs.existsSync(configLink);
}
