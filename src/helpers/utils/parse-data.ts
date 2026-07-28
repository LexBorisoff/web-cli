export function parseData<Result>(data?: string | null): Result | null {
  if (data == null || data === '') {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
