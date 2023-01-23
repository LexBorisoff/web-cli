import getConfig from "./getConfigData";

export default async function getProfiles() {
  const config = await getConfig();
  return config?.profiles;
}
