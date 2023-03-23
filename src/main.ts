#!/usr/bin/env node
import main from "./query";
import {
  configFileExists,
  configFileIsEmpty,
  setupConfig,
} from "./configuration";
import { getConfigArgs } from "./command";

if (!configFileExists() || configFileIsEmpty()) {
  setupConfig();
} else {
  if (!getConfigArgs().isConfig) {
    main();
  }
}
