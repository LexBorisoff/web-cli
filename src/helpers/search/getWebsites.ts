import { getUrlPattern } from "../utils";
import { getArgs } from "../../command";

const args = getArgs();
const urlPattern = getUrlPattern();

export default function getWebsites(): string[] {
  return args._.filter((arg) => urlPattern.test(`${arg}`)) as string[];
}
