#!/usr/bin/env node
import "core-js/stable";
import query from "./query";
import { withConfig } from "./command/with";
import handleConfig from "./config/handleConfig";

withConfig ? handleConfig() : query();
