#!/usr/bin/env node
import { getConfigArgs } from "./command/args";
import query from "./query";
import handleConfig from "./config/handleConfig";

getConfigArgs().config ? handleConfig() : query();
