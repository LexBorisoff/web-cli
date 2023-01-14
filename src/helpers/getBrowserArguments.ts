import { getArgs } from "../command";
const args = getArgs();

const empty = "--";

export default function getBrowserArguments(
  browser?: string,
  profile?: string
) {
  let browserArguments: string[] = [empty];
  function removeEmpty() {
    browserArguments = browserArguments.filter((arg) => arg !== empty);
  }

  if (profile) {
    browserArguments.push(`--profile-directory=${profile}`);
    removeEmpty();
  }

  if (args.incognito) {
    let incognito = "incognito";
    if (browser == "edge") {
      incognito = "inprivate";
    } else if (browser === "firefox" || browser === "opera") {
      incognito = "private";
    }
    browserArguments.push(`--${incognito}`);
    removeEmpty();
  }

  return browserArguments;
}
