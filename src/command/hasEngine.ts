import getArgs from "./getArgs";

const { engine } = getArgs();

export default function hasEngine(): boolean {
  return engine != null && engine !== "";
}
