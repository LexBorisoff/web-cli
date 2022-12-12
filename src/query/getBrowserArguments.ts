import { getArgs } from "../command";
const args = getArgs();

export default function getBrowserArguments(
  browserName: string,
  profileDirectory?: string
) {
  let browserArguments: string[] = [""];
  const removeEmptyArgument = () => {
    browserArguments = browserArguments.filter((arg) => arg !== "");
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
