import { getArgs } from "../command";

const args = getArgs();
const empty = "--";

export default function getBrowserArguments(
  browserName?: string,
  profileDiretory?: string
) {
  let browserArguments: string[] = [empty];
  function removeEmpty() {
    browserArguments = browserArguments.filter((arg) => arg !== empty);
  }

  if (profileDiretory != null) {
    browserArguments.push(`--profile-directory=${profileDiretory}`);
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
