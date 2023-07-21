import getCustomArgs from "./getCustomArgs";
import { getBrowserProfiles } from "../data";

/**
 * Returns a list of profile names and aliases supplied in args
 * using the form "--name" instead of "--profile name" or "-p name"
 * based on the profile names and aliases provided in the config file
 */
export default function getBrowserArgs(browserName: string): string[] {
  const profilesData = getBrowserProfiles(browserName);
  return getCustomArgs(profilesData);
}
