import { getArgs } from "../command";
const args = getArgs();

export default function getBrowserArguments(
  browserName?: string,
  profileDirectory?: string
) {
  const browserArguments: string[] = [];

  if (profileDirectory) {
    browserArguments.push(`--profile-directory=${profileDirectory}`);
  }

  if (args.incognito) {
    let incognito = "incognito";
    if (browserName == "edge") {
      incognito = "inprivate";
    } else if (browserName === "firefox" || browserName === "opera") {
      incognito = "private";
    }
    browserArguments.push(`--${incognito}`);
  }

  return browserArguments;
}
