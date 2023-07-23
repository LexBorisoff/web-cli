import getArgs from "./getArgs";
import { optionList, aliasList } from "./options";
import { WithAlias } from "../types/utility.types";

const args = getArgs();

interface Data<T> {
  [key: string]: T;
}

/**
 * Returns a list of arg options provided to the CLI command
 * that do not match any standard args based on the provided config data
 */
export default function getCustomArgs<T extends Partial<WithAlias>>(
  data: Data<T>
): string[] {
  const customArgs = Object.keys(args).filter(
    (key) => ![...optionList, ...aliasList].includes(key)
  );

  return Object.entries(data)
    .map(([key, { alias }]) => {
      if (alias != null) {
        return Array.isArray(alias) ? [key, ...alias] : [key, alias];
      }
      return key;
    })
    .flat()
    .filter((nameOrAlias) => customArgs.includes(nameOrAlias));
}
