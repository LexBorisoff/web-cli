import * as fs from "fs";
import getSettingsPath from "./getSettingsPath";
import { ConfigSettings } from "../../../types/config.types";

const settingsPath = getSettingsPath();

export default function getSettings(): ConfigSettings | null {
  try {
    const json = fs.existsSync(settingsPath)
      ? fs.readFileSync(settingsPath, { encoding: "utf-8" })
      : null;
    return json != null ? JSON.parse(json) : null;
  } catch {
    return null;
  }
}
