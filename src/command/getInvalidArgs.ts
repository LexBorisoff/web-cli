import getArgs from "./getArgs";
import { options, yargsOptions } from "./options";
import configFlags from "./configFlags";

const args = getArgs();

export default function getInvalidArgs(): string[] {
  return Object.keys(args).filter(
    (key) => ![...options, ...configFlags, ...yargsOptions].includes(key)
  );
}
