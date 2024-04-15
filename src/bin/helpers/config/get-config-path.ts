import * as os from "node:os";
import * as fs from "node:fs";
import * as path from "node:path";
import { ConfigValue } from "../../command/options.js";

export function getConfigPath(): string {
  const homedir = os.homedir();
  let directory: string | undefined;
  const { platform } = process;

  switch (platform) {
    case "win32": {
      directory = path.join(homedir, "AppData", "Roaming");
      break;
    }
    case "darwin": {
      directory = path.join(homedir, "Library", "Application Support");
      break;
    }
    case "linux": {
      const configPath = path.join(homedir, ".config");
      directory = fs.existsSync(configPath) ? configPath : homedir;
      break;
    }
    default: {
      directory = homedir;
      break;
    }
  }

  return path.join(directory, "@lexjs", "web-search");
}

export function getConfigFilePath(
  configType: ConfigValue.Browsers | ConfigValue.Engines
): string {
  const configPath = getConfigPath();
  return path.join(configPath, `${configType}.json`);
}
