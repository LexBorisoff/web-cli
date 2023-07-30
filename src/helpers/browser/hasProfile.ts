import { getDataArgs } from "../../command";

export default function hasProfile(browserName: string): boolean {
  return getDataArgs.profile(browserName).length > 0;
}
