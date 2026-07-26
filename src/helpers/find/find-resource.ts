import { findSite } from './find-engine.js';
import { findNested } from './find-nested.js';

export function findResource(
  siteArg: string,
  resourceName: string,
): string | null {
  const [, found] = findSite(siteArg) ?? [];

  if (found == null || found.resources == null) {
    return null;
  }

  return findNested<string>(found.resources, resourceName, '');
}
