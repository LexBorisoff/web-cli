const empty = "--";

export default function getBrowserArguments(
  browserName?: string,
  profileDirectory?: string | null,
  incognito = false
) {
  let browserArguments: string[] = [empty];
  function removeEmpty() {
    browserArguments = browserArguments.filter((arg) => arg !== empty);
  }

  if (profileDirectory != null) {
    browserArguments.push(`--profile-directory=${profileDirectory}`);
    removeEmpty();
  }

  if (incognito) {
    let incognitoValue = "incognito";
    if (browserName === "edge") {
      incognitoValue = "inprivate";
    } else if (browserName === "firefox" || browserName === "opera") {
      incognitoValue = "private";
    }
    browserArguments.push(`--${incognitoValue}`);
    removeEmpty();
  }

  return browserArguments;
}
