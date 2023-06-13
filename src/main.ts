#!/usr/bin/env node
import main from "./query/main";
import { getConfigArgs } from "./command";
import { hasData } from "./helpers/config";
import setupConfig from "./config/setup";
import changeConfig from "./config/change";

const args = getConfigArgs();
const hasConfig = hasData("config");

if (!hasConfig) {
  setupConfig();
} else if (args.config) {
  changeConfig();
} else {
  main();
}
