#!/usr/bin/env node

import { query } from "./query.js";
import { updateVersion } from "./update-version.js";
import { withUpdate, withConfig } from "./command/with.js";
import { createConfig } from "./config/create-config.js";

if (withUpdate) {
  updateVersion();
} else if (withConfig) {
  createConfig();
} else {
  query();
}
