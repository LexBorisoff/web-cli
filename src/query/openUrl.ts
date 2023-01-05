import open from "open";
import getBrowserArguments from "./getBrowserArguments";
import { getArgs } from "../command";

const args = getArgs();

export default async function openUrl(url: string) {
  const browserArguments = getBrowserArguments();
  const protocol = `http${args.secure ? "s" : ""}://`;
  await open(/^http/is.test(url) ? url : `${protocol}${url}`, {
    app: { name: "", arguments: browserArguments },
  });
}
