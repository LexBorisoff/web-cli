#!/usr/bin/env node
import query from "./query";
import { getConfigArgs } from "./command";
import handleConfig from "./config/handleConfig";

getConfigArgs().config ? handleConfig() : query();
