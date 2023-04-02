#!/usr/bin/env node
import main from "./query/main";
import { getConfigArgs } from "./command";
import { configFileExists, configFileIsEmpty } from "./setup/checkConfigFile";
import setupConfigFile from "./setup/setupConfigFile";

if (!configFileExists() || configFileIsEmpty()) {
  setupConfigFile();
} else {
  if (!getConfigArgs().isConfig) {
    main();
  }
}
