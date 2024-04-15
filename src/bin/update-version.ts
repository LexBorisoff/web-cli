import { exec } from "node:child_process";

export default function updateVersion() {
  exec("npm i -g @lexjs/web-search", (error, stdout, stderr) => {
    if (error != null) {
      console.log(stderr);
      return;
    }

    console.log(stdout);
  });
}
