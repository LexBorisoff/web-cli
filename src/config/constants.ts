import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const APP_DIR_PATH = path.join(os.homedir(), '.search-web');
export const CONFIG_DIR_PATH = path.join(APP_DIR_PATH, 'config');
export const DATA_FILE_PATH = path.join(APP_DIR_PATH, 'data.json');
export const DATA_FILE_EXISTS = fs.existsSync(DATA_FILE_PATH);
export const COMMAND_FALLBACK = 'web';
export const VS_CODE = 'code';
