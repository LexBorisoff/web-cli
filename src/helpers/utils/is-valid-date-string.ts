export function isValidDateString(value: string): value is string {
  return !Number.isNaN(new Date(value).getTime());
}
