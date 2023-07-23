import getCustomArgs from "./getCustomArgs";
import { getProfilesData } from "../data";

/**
 * Returns a list of profile names and aliases supplied in args
 * using the form "--name" instead of "--profile name" or "-p name"
 * based on the profile names and aliases provided in the config file
 */
export default function getProfileArgs(browserName: string): string[] {
  const profilesData = getProfilesData(browserName);
  return getCustomArgs(profilesData);
}
