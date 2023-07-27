import chalk from "chalk";
import { getConfigArgs } from "../command";
import {
  printInfo,
  printError,
  printWarning,
  emptyLine,
} from "../helpers/print";
import initConfig from "./initConfig";
import openConfig from "./openConfig";
import validateConfig from "./validateConfig";
import linkConfig from "./linkConfig";
import unlinkConfig from "./unlinkConfig";
import whereConfig from "./whereConfig";
import cacheConfig from "./cacheConfig";
import usingConfig from "./usingConfig";
import listConfig from "./listConfig";
import helpConfig from "./helpConfig";

/**
 * < > required argument
 * [ ] optional argument
 *
 * --config init [directory]                  -> initializes a config file
 *                                            (in current directory if not provided)
 * --config open [app]                        -> opens config (in deafult app if not provided)
 * --config validate                          -> checks if config passes validation
 * --config link <filename>                   -> links a config file
 * --config unlink                            -> unlinks the config file
 * --config where                             -> shows the path to the linked config file
 * --config cache [clear]                     -> caches data of the linked config file
 *                                            ("clear" argument deletes the cached data)
 * --config cache <filename>                  -> caches data of the provided config file
 * --config cache export [filename]           -> exports cache into the cachedPath or provided file
 * --config using                             -> shows if cached, linked, or no config is used
 * --config list <defaults|browsers|engines>  -> lists config contents
 * --config help                              -> help with config commands
 */

const { _: args } = getConfigArgs();

enum ConfigOption {
  init = "init",
  open = "open",
  validate = "validate",
  link = "link",
  unlink = "unlink",
  where = "where",
  cache = "cache",
  using = "using",
  list = "list",
  help = "help",
}

const validOptions = Object.values(ConfigOption) as string[];

function isValidOption(
  option: ReturnType<typeof args.at>
): option is ConfigOption {
  return typeof option === "string" && validOptions.includes(option);
}

export default function handleConfig(): void {
  const [option] = <Partial<typeof args>>args;

  if (option == null) {
    printWarning("--config must be used with a valid command:");
    printInfo(
      [...validOptions]
        .sort((a, b) => a.localeCompare(b))
        .join(chalk.gray(" | "))
    );
    emptyLine();
    return;
  }

  if (!isValidOption(option)) {
    printError("Invalid config command");
    emptyLine();
    return;
  }

  switch (option) {
    case ConfigOption.init:
      initConfig();
      break;
    case ConfigOption.open:
      openConfig();
      break;
    case ConfigOption.validate:
      validateConfig();
      break;
    case ConfigOption.link:
      linkConfig();
      break;
    case ConfigOption.unlink:
      unlinkConfig();
      break;
    case ConfigOption.where:
      whereConfig();
      break;
    case ConfigOption.cache:
      cacheConfig();
      break;
    case ConfigOption.using:
      usingConfig();
      break;
    case ConfigOption.list:
      listConfig();
      break;
    case ConfigOption.help:
      helpConfig();
      break;
  }

  // emptyLine(); TODO: remove empty lines in other places
}
