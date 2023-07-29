import getArgs from "./getArgs";
import { options } from "../options";
import { WithAlias } from "../../types/utility.types";

const args = getArgs();

interface Data<T> {
  [key: string]: T;
}

/**
 * Returns a list of arg options supplied to the CLI that are
 * specific to config data and do not match standard args
 */
export default function getCustomArgs<T extends Partial<WithAlias>>(
  data: Data<T>
): string[] {
  const customArgs = Object.keys(args).filter((key) => !options.includes(key));

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
