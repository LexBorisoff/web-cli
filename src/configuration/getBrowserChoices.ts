interface Choice {
  title: string;
  value: string;
}

export default function getBrowserChoices(browsers: string[]): Choice[] {
  return browsers.map((b) => ({
    title: `${b[0].toUpperCase()}${b.substring(1)}`,
    value: b,
  }));
}
