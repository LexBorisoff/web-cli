import { BrowsersData } from '@app-types/config.types.js';
import { readConfig } from '@config/read-config.js';

export function getBrowsersData(): NonNullable<BrowsersData> {
  return readConfig().browsers ?? {};
}
