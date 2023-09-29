/**
 * Returns a combined list of values that were supplied to the CLI
 * as standard options and custom flags
 */
export default function combineArgLists<Arg>(
  optionArg: Arg | NonNullable<Arg>[] | null,
  customArgs: Arg[] = []
): Arg[] {
  const argList = [...customArgs];
  if (optionArg != null) {
    argList.push(...(Array.isArray(optionArg) ? optionArg : [optionArg]));
  }

  return argList;
}
