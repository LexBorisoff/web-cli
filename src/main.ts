#!/usr/bin/env node
import { getConfigArgs } from "./command";
import query from "./query";
import openConfig from "./openConfig";

getConfigArgs().config ? openConfig() : query();
