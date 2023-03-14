import { getArgs } from "../command";

const args = getArgs();

export default function hasEngine() {
  return Boolean(args.engine);
}
