import { apps } from "open";

export default function getBrowserAppName(browserName: string) {
  switch (browserName) {
    case "chrome":
      return apps.chrome;
    case "firefox":
      return apps.firefox;
    case "edge":
      return apps.edge;
    default:
      return browserName;
  }
}
