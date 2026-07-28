import path from 'node:path';

import $_ from '@lexjs/prompts';
import { openApp } from 'open';

import { getAppData, writeAppData } from '@data/app-data.js';
import { logger } from '@utils/logger.js';

import { CONFIG_DIR_PATH } from './constants.js';
import { updateFileEditor } from './file-editor.js';

import type { Choice } from '@lexjs/prompts/lib';

enum ConfigChoice {
  Sites = 'sites',
  Browsers = 'browsers',
}

const configChoices: Choice<ConfigChoice>[] = [
  { title: 'Sites', value: ConfigChoice.Sites },
  { title: 'Browsers', value: ConfigChoice.Browsers },
];

function normalizeChoiceArg(arg?: string): ConfigChoice | undefined {
  if (arg != null) {
    if (ConfigChoice.Sites.startsWith(arg)) return ConfigChoice.Sites;
    if (ConfigChoice.Browsers.startsWith(arg)) return ConfigChoice.Browsers;
  }

  return undefined;
}

export async function openConfigFile(arg?: string): Promise<void> {
  const appData = getAppData();
  const editor = appData.editor ?? (await updateFileEditor());

  if (editor == null) return;

  const choice = normalizeChoiceArg(arg);
  const isConfigChoice =
    choice === ConfigChoice.Sites || choice === ConfigChoice.Browsers;

  let configChoice: ConfigChoice | undefined = isConfigChoice
    ? choice
    : undefined;

  if (choice == null || !isConfigChoice) {
    const { answer } = await $_.select({
      name: 'answer',
      message: 'Select config to edit',
      choices: configChoices,
    });
    configChoice = answer;
  }

  if (configChoice == null) return;

  const configFilePath = path.join(CONFIG_DIR_PATH, `${configChoice}.yml`);

  const subprocess = await openApp(editor, {
    arguments: [configFilePath],
  });

  subprocess.on('error', () => {
    writeAppData({ editor: undefined });
    logger.error('Error opening file editor:', editor);
  });
}
