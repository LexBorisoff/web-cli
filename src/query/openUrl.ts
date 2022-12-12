import open from "open";
import { getArgs } from "../command";
const args = getArgs();

export default async function openUrl(url: string) {
  const protocol = `http${args.secure ? "s" : ""}://`;
  await open(`${protocol}${url}`);
}
