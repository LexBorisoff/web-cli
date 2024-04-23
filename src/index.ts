#!/usr/bin/env node

import { query } from "./query/query.js";
import { updateVersion } from "./helpers/version/update-version.js";
import { createConfig } from "./config/create-config.js";
import { getQueryArgs } from "./command/args/get-query-args.js";

const { config, update } = getQueryArgs();

if (update) {
  updateVersion();
} else if (config) {
  createConfig();
} else {
  query();
}
