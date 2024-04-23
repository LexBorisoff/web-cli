interface NestedObject<V = any> {
  [key: string]: V | NestedObject<V>;
}

const isPrimitive = (value: unknown): value is string | number | boolean =>
  typeof value === "boolean" ||
  typeof value === "string" ||
  typeof value === "number";

export function findNested<
  V extends boolean | string | number,
  T extends NestedObject<V> = NestedObject<V>,
>(target: T, lookupKey: string, fallbackValue: V): V | null {
  return Object.keys(target).reduce<V | null>((result, key) => {
    if (result != null) {
      return result;
    }

    const value = target[key];

    if (key === lookupKey) {
      if (isPrimitive(value)) {
        return value;
      }

      const first = Object.values(value).at(0);
      if (isPrimitive(first)) {
        return first;
      }

      return fallbackValue;
    }

    if (typeof value === "object") {
      return findNested(value, lookupKey, fallbackValue);
    }

    return null;
  }, null);
}
