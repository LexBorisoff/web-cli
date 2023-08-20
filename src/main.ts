#!/usr/bin/env node
import "core-js/stable";
import query from "./query";
import { withConfigArgs } from "./command/args";
import handleConfig from "./config/handleConfig";

withConfigArgs() ? handleConfig() : query();
