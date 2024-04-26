import { exec } from "node:child_process";
import { print } from "../print/severity.js";
import { getPackageJson } from "./get-package-json.js";

const projectName = getPackageJson().name!;

export function updateVersion() {
  exec(`npm i -g ${projectName}@latest`, (error, stdout, stderr) => {
    if (error != null) {
      print(stderr);
      return;
    }

    print(stdout);
  });
}
