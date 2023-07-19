import getConfigData from "./getConfigData";
import { ProfilesConfig } from "../types/config.types";

export default function getBrowserProfiles(
  browserName: string
): ProfilesConfig {
  const config = getConfigData();
  return config.browsers?.[browserName]?.profiles ?? {};
}
