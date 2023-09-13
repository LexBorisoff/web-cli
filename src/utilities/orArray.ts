/**
 * Returns the same item as its type or type array
 */
export default function orArray<Item>(item: Item): Item | NonNullable<Item>[] {
  return item;
}
