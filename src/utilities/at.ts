export default function at<Item>(list: Item[], index: number) {
  return list[index] as Item | undefined;
}
