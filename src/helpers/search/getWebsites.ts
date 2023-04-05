import { urlPattern } from "../patterns";
import { getArgs } from "../../command";

const { _: args } = getArgs();

export default function getWebsites(): string[] {
  return args
    .map((arg) => (typeof arg === "string" ? arg : `${arg}`))
    .filter((arg) => urlPattern.test(arg));
}