import { getArgs } from "../command";
const args = getArgs();

// needed for opening an empty browser without url
const empty = "--";

export default function getBrowserArguments(
  browserName?: string,
  profileDirectory?: string
) {
  let browserArguments: string[] = [empty];
  function removeEmpty() {
    browserArguments = browserArguments.filter((arg) => arg !== empty);
  }

  if (profileDirectory) {
    browserArguments.push(`--profile-directory=${profileDirectory}`);
    removeEmpty();
  }

  if (args.incognito) {
    let incognito = "incognito";
    if (browserName == "edge") {
      incognito = "inprivate";
    } else if (browserName === "firefox" || browserName === "opera") {
      incognito = "private";
    }
    browserArguments.push(`--${incognito}`);
    removeEmpty();
  }

  return browserArguments;
}
