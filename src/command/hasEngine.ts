import getArgs from "./getArgs";

const args = getArgs();

export default function hasEngine() {
  return Boolean(args.engine);
}
