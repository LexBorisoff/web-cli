import { $, ExecaError } from 'execa';
import { FsHooks } from 'fs-hooks';

import { logger } from '../utils/logger.js';

const dirHooks = FsHooks.dirHooks((targetDir) => ({
  async x(fileName) {
    const currentPath = process.cwd();
    process.chdir(targetDir.path);

    try {
      await $`chmod +x ${fileName}`;
    } catch (error) {
      if (error instanceof Error || error instanceof ExecaError) {
        logger.error(error.message);
      }
    }

    process.chdir(currentPath);
  },
}));

export const permissionsHooks = {
  dir: dirHooks,
} as const;
