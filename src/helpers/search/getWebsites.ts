import { urlPattern } from "../patterns";
import { getArgs } from "../../command";

const args = getArgs();

export default function getWebsites(): string[] {
  return args._.filter((arg) => urlPattern.test(`${arg}`)) as string[];
}
