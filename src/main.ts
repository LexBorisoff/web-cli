#!/usr/bin/env node
import { withConfigArgs } from "./command/args";
import query from "./query";
import handleConfig from "./config/handleConfig";

withConfigArgs() ? handleConfig() : query();
