#!/usr/bin/env node
import main from "./query/main";
import { getConfigArgs } from "./command";
import hasConfig from "./helpers/hasConfig";
import setupConfig from "./config/setup";
import changeConfig from "./config/change";

const args = getConfigArgs();
if (!hasConfig()) {
  setupConfig();
} else if (args.config) {
  changeConfig();
} else {
  main();
}
