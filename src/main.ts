#!/usr/bin/env node
import main from "./query/main";
import { getConfigArgs } from "./command";
import hasConfig from "./helpers/hasConfig";
import setupConfig from "./browser_config/setup";
import changeConfig from "./browser_config/change";

const args = getConfigArgs();
if (!hasConfig()) {
  setupConfig();
} else if (args.config) {
  changeConfig();
} else {
  main();
}
