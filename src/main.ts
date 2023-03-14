#!/usr/bin/env node
import main from "./query";
import {
  configFileExists,
  configFileIsEmpty,
  setupConfig,
} from "./configuration";

if (!configFileExists() || configFileIsEmpty()) {
  setupConfig();
} else {
  main();
}
