import { exec } from "node:child_process";
import { print } from "../print/severity.js";

export function updateVersion() {
  exec("npm i -g @lexjs/web-cli", (error, stdout, stderr) => {
    if (error != null) {
      print(stderr);
      return;
    }

    print(stdout);
  });
}
