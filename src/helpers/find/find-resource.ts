import { ResourceObject } from "@lexjs/browser-search";
import { findEngine } from "./find-engine.js";

function findValueByKey(
  resources: ResourceObject,
  resourceKey: string
): string | null {
  return Object.keys(resources).reduce<string | null>((result, key) => {
    if (result != null) {
      return result;
    }

    const value = resources[key];

    if (key === resourceKey) {
      if (typeof value === "string") {
        return value;
      }

      const first = Object.values(value).at(0);
      if (typeof first === "string") {
        return first;
      }

      return "";
    }

    if (typeof value === "object") {
      return findValueByKey(value, resourceKey);
    }

    return null;
  }, null);
}

export function findResource(
  engineArg: string,
  resourceName: string
): string | null {
  const [, found] = findEngine(engineArg) ?? [];

  if (found == null) {
    return null;
  }

  const resources = found.resources ?? {};
  return findValueByKey(resources, resourceName);
}
