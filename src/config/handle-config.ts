import { configArgs } from '@command/args/config-args.js';

import { openConfigFile } from './config-file.js';
import { updateFileEditor } from './file-editor.js';

const _ = configArgs._.map((arg) => `${arg}`);

export async function handleConfig(): Promise<void> {
  if (_.length === 0) {
    await openConfigFile();
    return;
  }

  if (_.at(0) === 'editor') {
    await updateFileEditor();
  }
}
