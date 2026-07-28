#!/usr/bin/env node

import { configArgs } from '@command/args/config-args.js';
import { handleConfig } from '@config/handle-config.js';
import { logger } from '@helpers/utils/logger.js';
import { query } from '@query/query.js';

const { config } = configArgs;

(async function main(): Promise<void> {
  if (config) {
    await handleConfig();
    return;
  }

  query();
})();

process.on('uncaughtException', (err: NodeJS.ErrnoException) => {
  if (err.code !== 'ENOENT') {
    logger.error('An error occurred');
  }

  process.exit(1);
});
