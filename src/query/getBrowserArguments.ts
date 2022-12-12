import { getArgs } from "../command";
const args = getArgs();

const empty = "--";

export default function getBrowserArguments(
  browserName: string,
  profileDirectory?: string
) {
  let browserArguments: string[] = [empty];
  const removeEmptyArgument = () => {
    browserArguments = browserArguments.filter((arg) => arg !== empty);
  };

  if (profileDirectory) {
    browserArguments.push(`--profile-directory=${profileDirectory}`);
    removeEmptyArgument();
  }

  if (args.incognito) {
    let incognito = "incognito";
    if (browserName == "edge") {
      incognito = "inprivate";
    } else if (browserName === "firefox" || browserName === "opera") {
      incognito = "private";
    }
    browserArguments.push(`--${incognito}`);
    removeEmptyArgument();
  }

  return browserArguments;
}
