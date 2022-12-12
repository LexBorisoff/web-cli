import { getArgs } from "../command";
const args = getArgs();
export default function hasSearchQuery() {
  return args._.length > 0;
}
