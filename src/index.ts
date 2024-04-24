#!/usr/bin/env node

import { query } from "./query/query.js";
import { updateVersion } from "./helpers/version/update-version.js";
import { createConfig } from "./config/create-config.js";
import { queryArgs } from "./command/args/query-args.js";
import { configArgs } from "./command/args/config-args.js";

if (queryArgs.update) {
  updateVersion();
} else if (configArgs.config) {
  createConfig();
} else {
  query();
}
