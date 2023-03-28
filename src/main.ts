#!/usr/bin/env node
import main from "./query";
import {
  configFileExists,
  configFileIsEmpty,
  setupConfigFile,
} from "./configuration";
import { getConfigArgs } from "./command";

if (!configFileExists() || configFileIsEmpty()) {
  setupConfigFile();
} else {
  if (!getConfigArgs().isConfig) {
    main();
  }
}
