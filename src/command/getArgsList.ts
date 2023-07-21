export default function getArgsList(
  args: string | string[] | null | undefined,
  customArgs: string[]
): string[] {
  function getList(values: string[]) {
    return [...customArgs, ...values];
  }

  if (args != null) {
    return getList(Array.isArray(args) ? args : [args]);
  }

  return customArgs;
}
