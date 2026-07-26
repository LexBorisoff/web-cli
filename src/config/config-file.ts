import path from 'node:path';

import $_ from '@lexjs/prompts';
import { openApp } from 'open';

import { logger } from '@helpers/utils/logger.js';

import { getAppData, writeAppData } from './app-data.js';
import { CONFIG_DIR_PATH } from './constants.js';
import { updateFileEditor } from './file-editor.js';

import type { Choice } from '@lexjs/prompts/lib';

type ConfigChoice = 'sites' | 'browsers';

const configChoices: Choice<ConfigChoice>[] = [
  { title: 'Sites', value: 'sites' },
  { title: 'Browsers', value: 'browsers' },
];

export async function openConfigFile(): Promise<void> {
  const appData = getAppData();
  const editor = appData.editor ?? (await updateFileEditor());

  if (editor == null) return;

  const { configOption } = await $_.select({
    name: 'configOption',
    message: 'Select config to edit',
    choices: configChoices,
  });

  if (configOption == null) return;

  const configFilePath = path.join(CONFIG_DIR_PATH, `${configOption}.yml`);

  const subprocess = await openApp(editor, {
    arguments: [configFilePath],
  });

  subprocess.on('error', () => {
    writeAppData({ editor: undefined });
    logger.error('Error opening file editor:', editor);
  });
}
