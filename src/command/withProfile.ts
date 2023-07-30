import { getDataArgs } from "./args";
import { getDefaultsData } from "../data";

const defaults = getDefaultsData();

export default function withProfile(browserName: string): boolean {
  return (
    getDataArgs.profile(browserName).length > 0 ||
    defaults.profile?.[browserName] != null
  );
}
