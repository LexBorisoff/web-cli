/**
 * Returns a combined list of values that were supplied to the CLI
 * as standard options or custom flags
 */
export function combineArgLists(
  optionArg: string | string[] | null | undefined,
  customArgs: string[] = []
): string[] {
  const argList = [...customArgs];
  if (optionArg != null) {
    argList.push(...(Array.isArray(optionArg) ? optionArg : [optionArg]));
  }

  return argList;
}
