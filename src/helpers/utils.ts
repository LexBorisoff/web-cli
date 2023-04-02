import { WithAlias } from "../types/utility.types";

interface ConfigItemList<Item = WithAlias> {
  [item: string]: Item;
}

export function getConfigItemByNameOrAlias<List extends ConfigItemList>(
  name: string,
  list: List
): List[keyof List] | undefined {
  // name is object's key
  if (Object.keys(list).includes(name)) {
    return list[name as keyof List];
  }

  // name is an alias
  const found = Object.values(list).find((item) => {
    const { alias } = item;
    if (alias != null) {
      if (
        (Array.isArray(alias) && alias.includes(name)) ||
        (typeof alias === "string" && alias === name)
      ) {
        return item;
      }
    }
  });

  return found as List[keyof List];
}

export function getUrlPattern() {
  return /[a-z\d-]+\.[a-z]{2,}$/is;
}
