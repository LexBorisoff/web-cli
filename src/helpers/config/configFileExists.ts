import * as fs from "fs";
import getSettings from "./getSettings";

export default function configFileExists(): boolean {
  const configLink = getSettings()?.link;
  return configLink != null && fs.existsSync(configLink);
}
