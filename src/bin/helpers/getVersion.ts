import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";

export default function getVersion(): string {
  let version = "Could not fetch version";

  /**
   * root
   *  ./dist/bin/helpers/getVersion.js
   *  ./package.json
   */
  try {
    const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
    const root = path.join(__dirname, "../../../");

    const json = fs.readFileSync(path.resolve(`${root}/package.json`), {
      encoding: "utf-8",
    });

    const data = JSON.parse(json) as { version?: string };

    if (data.version != null) {
      version = `Version ${data.version}`;
    }
  } catch {
    // fail silently
  }

  return version;
}
