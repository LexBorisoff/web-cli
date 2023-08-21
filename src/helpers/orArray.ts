export default function orArray<T>(arg: T): T | NonNullable<T>[] {
  return arg;
}
