import { Browser } from "browsers";

import open from "open";
import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import browsersConfig from "../browsers.json";

const browsers: Browser[] = [
  "chrome",
  "edge",
  "firefox",
  "brave",
  "opera",
  "safari",
];

const args = yargs(hideBin(process.argv))
  .option("chrome", { alias: "c" })
  .option("edge", { alias: "e" })
  .option("firefox", { alias: ["f", "ff"] })
  .option("brave", { alias: "b" })
  .option("opera", { alias: "o" })
  .option("safari", {})
  .parseSync();

const url = "google.com";

function openBrowser() {
  browsers.forEach(async (browser: Browser) => {
    if (args[browser] && browsersConfig[browser].enable) {
      await open(url, { app: { name: browser } });
    }
  });
}

openBrowser();
