export function isEmptyArg(args: string[]): boolean {
  return args.length === 1 && args[0] === "";
}

/**
 * Returns a combined list of values that were supplied to the CLI
 * as standard options and custom flags
 */
export function combineArgLists<Arg>(
  optionArg: Arg | NonNullable<Arg>[] | null,
  customArgs: Arg[] = []
): Arg[] {
  const argList = [...customArgs];
  if (optionArg != null) {
    argList.push(...(Array.isArray(optionArg) ? optionArg : [optionArg]));
  }

  return argList;
}

/**
 * Returns the same argument as its type or type array
 */
export function orArray<Arg>(arg: Arg): Arg | NonNullable<Arg>[] {
  return arg;
}
