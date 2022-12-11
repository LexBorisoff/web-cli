import open from "open";

export default function getBrowser(browserName: string) {
  switch (browserName) {
    case "chrome":
      return open.apps.chrome;
    case "firefox":
      return open.apps.firefox;
    case "edge":
      return open.apps.edge;
    default:
      return browserName;
  }
}
