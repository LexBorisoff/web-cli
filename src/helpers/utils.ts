import { ConfigItem } from "../types";

interface ConfigItemList<I> {
  [item: string]: I;
}

export function getConfigItemByNameOrAlias<
  I extends ConfigItem,
  L extends ConfigItemList<I>
>(name: string, list: L): I | undefined {
  // name is object's key
  if (Object.keys(list).includes(name)) {
    return list[name];
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

  return found;
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
