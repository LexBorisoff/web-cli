import fs from 'node:fs';

import { DATA_FILE_EXISTS, DATA_FILE_PATH } from './constants.js';

export interface AppDataInterface {
  editor?: string;
}

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

  return {};
}

export function writeAppData(payload: Partial<AppDataInterface>): void {
  let data: AppDataInterface = {};
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
