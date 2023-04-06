export default function findExistingValues(
  checkValues: string[],
  existingList: string[]
): string[] {
  const found: string[] = [];

  checkValues.forEach((value) => {
    if (existingList.includes(value)) {
      found.push(value);
    }
  });

  return found;
}
