import * as os from "os";
import * as fs from "fs";
import * as path from "path";

export default function getConfigPath() {
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

  return path.join(directory, "lexjs", "web");
}
