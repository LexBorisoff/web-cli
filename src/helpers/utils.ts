import { ConfigItem } from "../types";

interface ConfigItemList<Item = ConfigItem> {
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

export function constructChoices<L extends object>(list: L): string[] {
  let result: string[] = [];
  Object.entries(list).forEach(([key, item]) => {
    result = [...result, key.toLowerCase()];

    if (item.alias) {
      if (Array.isArray(item.alias)) {
        result = [
          ...result,
          ...item.alias.map((alias: string) => alias.toLowerCase()),
        ];
      } else {
        result = [...result, item.alias.toLowerCase()];
      }
    }
  });
  return result;
}
