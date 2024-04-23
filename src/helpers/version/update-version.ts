import { exec } from "node:child_process";

export function updateVersion() {
  exec("npm i -g @lexjs/web-cli", (error, stdout, stderr) => {
    if (error != null) {
      console.log(stderr);
      return;
    }

    console.log(stdout);
  });
}
