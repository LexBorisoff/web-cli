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

async function main() {
  const hasConfig = hasData("config");
  const withArgs = withEngine || withSearchQuery || withWebsite;
  const proceed = hasConfig || (!hasConfig && withArgs);

  if (args.config) {
    if (hasConfig) {
      changeConfig();
    }
    return;
  }

  if (!hasConfig) {
    await setupConfig();
  }

  if (proceed) {
    query();
  }
}

main();
