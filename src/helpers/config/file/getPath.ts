import * as fs from "fs";
import { ConfigSettings } from "../../../types/config.types";
import getSettingsPath from "../getSettingsPath";

function hasPath(data: unknown): data is ConfigSettings {
  return (
    data instanceof Object &&
    "path" in data &&
    typeof data.path === "string" &&
    data.path !== ""
  );
}

/**
 * Returns the config file's path provided in the project's config settings
 */
export default function getPath(): string | undefined {
  const settingsPath = getSettingsPath();

  if (!fs.existsSync(settingsPath)) {
    return undefined;
  }

  try {
    const json = fs.readFileSync(settingsPath, { encoding: "utf-8" });
    const settings = JSON.parse(json);
    return hasPath(settings) ? settings.path : undefined;
  } catch {
    return undefined;
  }
}
