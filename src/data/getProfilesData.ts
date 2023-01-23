import getConfig from "./getConfigData";

export default async function getProfilesData() {
  const config = await getConfig();
  return config?.profiles;
}
