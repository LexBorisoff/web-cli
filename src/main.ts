#!/usr/bin/env node
import main from "./query/main";
import { getConfigArgs } from "./command";
import { configFileExists, configFileIsEmpty } from "./helpers/checkConfigFile";
import setupConfig from "./browser_config/setup";

if (!configFileExists() || configFileIsEmpty()) {
  setupConfig();
} else {
  if (!getConfigArgs().isConfig) {
    main();
  }
}
