#!/usr/bin/env node
import main from "./query/main";
import { getConfigArgs } from "./command";
import hasConfig from "./helpers/hasConfig";
import setupConfig from "./browser_config/setup";

if (!hasConfig()) {
  setupConfig();
} else {
  if (!getConfigArgs().isConfig) {
    main();
  }
}
