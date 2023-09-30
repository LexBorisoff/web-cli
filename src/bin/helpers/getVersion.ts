import * as fs from "node:fs";
import * as path from "node:path";

export default function getVersion(): string {
  let version = "Could not fetch version";

  try {
    const json = fs.readFileSync(
      path.resolve(`${__dirname}/../../package.json`),
      {
        encoding: "utf-8",
      }
    );

    const data = JSON.parse(json) as { version?: string };

    if (data.version != null) {
      version = `Version ${data.version}`;
    }
  } catch {
    // fail silently
  }

  return version;
}
