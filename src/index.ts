import open from "open";
import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import { chrome, edge, firefox, brave, opera, safari } from "./apps";

const args = yargs(hideBin(process.argv))
  .option("chrome", { alias: "c" })
  .option("edge", { alias: "e" })
  .option("firefox", { alias: ["f", "ff"] })
  .option("brave", { alias: "b" })
  .option("opera", { alias: "o" })
  .option("safari", {})
  .parseSync();

const url = "google.com";

if (args.chrome && chrome) {
  open(url, { app: { name: chrome } });
}

if (args.edge && edge) {
  open(url, { app: { name: edge } });
}

if (args.firefox && firefox) {
  open(url, { app: { name: firefox } });
}

if (args.brave && brave) {
  open(url, { app: { name: brave } });
}

if (args.opera && opera) {
  open(url, { app: { name: opera } });
}

if (args.safari && safari) {
  open(url, { app: { name: safari } });
}
