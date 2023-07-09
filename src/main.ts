#!/usr/bin/env node
import query from "./query";
import {
  getConfigArgs,
  withEngine,
  withSearchQuery,
  withWebsite,
} from "./command";
import { hasData } from "./helpers/config";
import setupConfig from "./config/setup";
import changeConfig from "./config/change";

const args = getConfigArgs();
const hasConfig = hasData("config");

async function main() {
  const withArgs = withEngine || withSearchQuery || withWebsite;
  const proceedToQuery = hasConfig || (!hasConfig && withArgs);

  if (!hasConfig) {
    await setupConfig();
  }

  if (proceedToQuery) {
    query();
  }
}

if (!args.config) {
  main();
} else if (hasConfig) {
  changeConfig();
}
