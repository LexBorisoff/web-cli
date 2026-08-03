import { FsHooks } from 'fs-hooks';
import { coreHooks } from 'fs-hooks/core';

import { paths } from '../create-app/paths.js';
import { tree } from '../create-app/tree.js';

const fsHooks = new FsHooks(paths.root, tree);

export const useCoreHooks = fsHooks.useHooks(coreHooks);
