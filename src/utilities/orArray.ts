/**
 * Returns the same argument as its type or type array
 */
export default function orArray<Arg>(arg: Arg): Arg | NonNullable<Arg>[] {
  return arg;
}
