export function parseData<T extends object = any>(
  data?: string | null
): T | null {
  if (data == null || data === "") {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
