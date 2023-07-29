export default function isEmptyArg(args: string[]): boolean {
  return args.length === 1 && args[0] === "";
}
