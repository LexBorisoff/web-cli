import { hideBin } from "yargs/helpers";
import yargs from "yargs";

interface Args {
  [key: string]: unknown;
  browser?: string | string[];
  profile?: string | string[];
  engine?: string | string[];
  package: boolean;
  incognito: boolean;
  secure: boolean;
  config: unknown;
  help: unknown;
  _: (string | number)[];
  $0: string;
}

export default function getArgs(): Args {
  return yargs(hideBin(process.argv))
    .option("browser", {
      type: "string",
      alias: "b",
      requireArg: true,
    })
    .option("profile", {
      type: "string",
      description: "Browser profile",
      alias: "p",
      requireArg: true,
    })
    .option("engine", {
      type: "string",
      description: "Search engine / website to query",
      alias: ["website", "e", "w"],
      requireArg: true,
    })
    .option("package", {
      type: "boolean",
      description: "Search packages / libraries on websites that have them",
      alias: ["pack", "pkg", "library", "lib"],
      default: false,
    })
    .option("incognito", {
      type: "boolean",
      alias: ["i", "private"],
      default: false,
    })
    .option("secure", {
      type: "boolean",
      description: "Use https protocol during search",
      alias: ["s", "https"],
      default: true,
    })
    .option("config", {})
    .help(false)
    .option("help", {
      alias: "h",
    })
    .parseSync();
}
