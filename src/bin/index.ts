#!/usr/bin/env node

import query from "./query.js";
import updateVersion from "./update-version.js";
import { withUpdate, withConfig } from "./command/with.js";
import handleConfig from "./config/handleConfig.js";

if (withUpdate) {
  updateVersion();
} else if (withConfig) {
  handleConfig();
} else {
  query();
}
