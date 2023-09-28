#!/usr/bin/env node

import query from "./query/index.js";
import { withConfig } from "./command/with.js";
import handleConfig from "./config/handleConfig.js";

withConfig ? handleConfig() : query();
