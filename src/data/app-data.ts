import fs from 'node:fs';

import {
  DATA_FILE_EXISTS,
  DATA_FILE_PATH,
  COMMAND_FALLBACK,
} from '@config/constants.js';

export interface AppDataInterface {
  /**
   * Executable script name
   */
  command: string;
  editor?: string;
}

const defaultAppData: AppDataInterface = {
  command: COMMAND_FALLBACK,
};

function readDataFile(): AppDataInterface {
  const dataRaw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
  return JSON.parse(dataRaw);
}

export function getAppData(): AppDataInterface {
  if (DATA_FILE_EXISTS) {
    try {
      return readDataFile();
    } catch {
      // noop
    }
  }

  return defaultAppData;
}

export function writeAppData(payload: Partial<AppDataInterface>): void {
  let data: AppDataInterface = defaultAppData;
  if (DATA_FILE_EXISTS) {
    try {
      data = readDataFile();
    } catch {
      // noop
    }
  }

  const newData: AppDataInterface = { ...data, ...payload };
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(newData));
}
