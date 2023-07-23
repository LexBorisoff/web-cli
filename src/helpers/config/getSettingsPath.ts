import * as path from "path";

/**
 * Returns the path to the config settings file inside the project
 */
export default function getSettingsPath(): string {
  return path.resolve(`${__dirname}/../../config.json`);
}
