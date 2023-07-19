import { WithAlias } from "../../types/utility.types";

interface List<Item> {
  [key: string]: Item;
}

function withAlias<Item>(item: Item): item is Item & WithAlias {
  return item instanceof Object && "alias" in item;
}

// get config item by name or alias
export default function getConfigItem<Item>(
  nameOrAlias: string,
  list: List<Item>
): Item | undefined {
  // name is object's key
  if (Object.keys(list).includes(nameOrAlias)) {
    return list[nameOrAlias];
  }

  // name is an alias
  const listNames = Object.values(list);
  const found = listNames.find((item) => {
    if (!withAlias(item)) {
      return undefined;
    }

    const { alias } = item;
    const hasAlias =
      (Array.isArray(alias) && alias.includes(nameOrAlias)) ||
      (typeof alias === "string" && alias === nameOrAlias);

    return hasAlias ? item : undefined;
  });

  return found;
}
