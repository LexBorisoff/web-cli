import { Defaults } from "defaults";
import config from "./config.json";

export function getDefaults(): Defaults {
  const mainDefaults = {
    engine: "google",
    delimiter: " ",
  };
  return {
    ...mainDefaults,
    ...config.defaults,
  };
}

export function getKeyFromConfig<T extends Object>(name: string, list: T) {
  if (Object.keys(list).includes(name)) {
    return name;
  }

  let keyFromConfig;
  Object.entries(list).forEach(([key, item]) => {
    if (item.alias) {
      if (
        (Array.isArray(item.alias) && item.alias.includes(name)) ||
        item.alias === name
      ) {
        keyFromConfig = key;
        return;
      }
    }
  });
  console.log("herr");
  return keyFromConfig;
}

export function constructChoices<T extends Object>(list: T) {
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
