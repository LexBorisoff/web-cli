#!/usr/bin/env node
import main from "./query/main";
import { getConfigArgs } from "./command";
import { hasConfig } from "./helpers/config";
import setupConfig from "./config/setup";
import changeConfig from "./config/change";

const args = getConfigArgs();

// TODO: fetch engines if file doesn't exist
if (!hasConfig()) {
  setupConfig();
} else if (args.config) {
  changeConfig();
} else {
  main();
}
