import * as fs from "fs";
import getSettingsPath from "./getSettingsPath";
import { ConfigSettings } from "../../types/config.types";

function hasConfigLink(settings: unknown): settings is ConfigSettings {
  return (
    settings instanceof Object &&
    "link" in settings &&
    typeof settings.link === "string" &&
    settings.link !== ""
  );
}

/**
 * Returns the config file's path provided in the project's config settings
 */
export default function getConfigLink(): string | undefined {
  const settingsPath = getSettingsPath();

  if (!fs.existsSync(settingsPath)) {
    return undefined;
  }

  try {
    const json = fs.readFileSync(settingsPath, { encoding: "utf-8" });
    const settings = JSON.parse(json);
    return hasConfigLink(settings) ? settings.link : undefined;
  } catch {
    return undefined;
  }
}
