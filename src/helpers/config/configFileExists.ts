import * as fs from "fs";
import getSettings from "./getSettings";

const { linkedPath } = getSettings() ?? {};

export default function configFileExists(): boolean {
  return linkedPath != null && fs.existsSync(linkedPath);
}
