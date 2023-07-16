#!/usr/bin/env node
import { getConfigArgs } from "./command";
import { hasData, setupInitialConfig } from "./helpers/config";
import query from "./query";
import openConfig from "./openConfig";

if (!hasData()) {
  setupInitialConfig();
}

getConfigArgs().config ? openConfig() : query();
