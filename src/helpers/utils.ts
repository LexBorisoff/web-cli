export function constructChoices<T extends object>(list: T): string[] {
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

export function getConfigItemByNameOrAlias<T extends object>(
  name: string,
  list: T
) {
  if (Object.keys(list).includes(name)) {
    return list[name as keyof T];
  }

  let found;
  Object.values(list).forEach((item) => {
    if (item.alias) {
      if (
        (Array.isArray(item.alias) && item.alias.includes(name)) ||
        item.alias === name
      ) {
        found = item;
        return;
      }
    }
  });
  return found;
}
