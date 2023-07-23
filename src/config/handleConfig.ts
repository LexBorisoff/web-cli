import getConfigArgs from "../command/getConfigArgs";
import initConfig from "./initConfig";
import linkConfig from "./linkConfig";
import cacheConfig from "./cacheConfig";
import whereConfig from "./whereConfig";
import usingConfig from "./usingConfig";
import openConfig from "./openConfig";
import listConfig from "./listConfig";

/**
 * < > required argument
 * [ ] optional argument
 *
 * --config init [directory]                  -> initializes a config file
 *                                            (in current directory if not provided)
 * --config link <filename>                   -> links a config file
 * --config cache [clear]                     -> caches data of the linked config file
 *                                            ("clear" argument deletes the cached data)
 * --config where                             -> shows the path to the linked config file
 * --config using                             -> shows if uses cached or linked config
 * --config open [app]                        -> opens [cached] config in the app
 * --config list <defaults|browsers|engines>  -> lists config contents
 * --config help                              -> help with config commands
 */

const { _: args } = getConfigArgs();

enum ConfigOption {
  init = "init",
  link = "link",
  cache = "cache",
  where = "where",
  using = "using",
  open = "open",
  list = "list",
  help = "help",
}

const validOptions = Object.values(ConfigOption) as string[];

function isValidOption(
  option: ReturnType<typeof args.at>
): option is ConfigOption {
  return typeof option === "string" && validOptions.includes(option);
}

export default async function handleConfig() {
  const option = args.at(0);

  if (isValidOption(option)) {
    switch (option) {
      case ConfigOption.init:
        initConfig();
        break;
      case ConfigOption.link:
        linkConfig();
        break;
      case ConfigOption.cache:
        cacheConfig();
        break;
      case ConfigOption.where:
        whereConfig();
        break;
      case ConfigOption.using:
        usingConfig();
        break;
      case ConfigOption.open:
        openConfig();
        break;
      case ConfigOption.list:
        listConfig();
        break;
    }
  }
}
