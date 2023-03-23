#!/usr/bin/env node
import main from "./query";
import {
  configFileExists,
  configFileIsEmpty,
  setupConfig,
  updateConfig,
} from "./configuration";
import { getConfigArgs } from "./command";

if (!configFileExists() || configFileIsEmpty()) {
  setupConfig();
} else {
  getConfigArgs().isConfig ? updateConfig() : main();
}
