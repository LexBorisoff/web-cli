#!/usr/bin/env node
import query from "./query";
import { withConfigArgs } from "./command/args";
import handleConfig from "./config/handleConfig";

withConfigArgs() ? handleConfig() : query();
