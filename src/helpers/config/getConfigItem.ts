import { WithAlias } from "../../types/utility.types";

function hasAlias<T>(item: T): item is T & WithAlias {
  return item instanceof Object && "alias" in item;
}

// get config item by name or alias
export default function getConfigItem<List extends object>(
  name: string,
  list: List
): List[keyof List] | undefined {
  // name is object's key
  if (Object.keys(list).includes(name)) {
    return list[name as keyof List];
  }

  // name is an alias
  const listNames: List[keyof List][] = Object.values(list);
  const found = listNames.find((item) => {
    if (hasAlias(item)) {
      const { alias } = item;
      if (
        (Array.isArray(alias) && alias.includes(name)) ||
        (typeof alias === "string" && alias === name)
      ) {
        return item;
      }
    }

    return undefined;
  });

  return found;
}
