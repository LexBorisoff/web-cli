import os from 'node:os';

import { getPackageJson } from '@utils/get-package-json.js';

const NODE_ENV = process.env.NODE_ENV;

export const PACKAGE_NAME = getPackageJson().name!;
export const IS_WINDOWS = os.platform() === 'win32';
export const IS_DEV = NODE_ENV === 'development' || NODE_ENV === 'dev';

export const DATA_FILE = 'data.json';
export const SITES_CONFIG_FILE = 'sites.yml';
export const BROWSERS_CONFIG_FILE = 'browsers.yml';

export const BASE_SCHEMA_FILE = 'base.json';
export const SITES_SCHEMA_FILE = 'sites.json';
export const BROWSERS_SCHEMA_FILE = 'browsers.json';
