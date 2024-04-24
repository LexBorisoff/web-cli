#!/usr/bin/env node

import { queryArgs } from "./command/args/query-args.js";
import { configArgs } from "./command/args/config-args.js";
import { query } from "./query/query.js";
import { handleConfig } from "./config/handle-config.js";
import { updateVersion } from "./helpers/version/update-version.js";

if (configArgs.config) {
  handleConfig();
} else if (queryArgs.update) {
  updateVersion();
} else {
  query();
}
