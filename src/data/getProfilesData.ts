import getConfigData from "./getConfigData";
import { ProfilesConfig } from "../types/config.types";

export default function getProfilesData(): ProfilesConfig {
  const config = getConfigData();
  return config?.profiles ?? {};
}
