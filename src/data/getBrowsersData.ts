import getConfig from "./getConfigData";

export default async function getBrowsers() {
  const config = await getConfig();
  return config?.browsers ?? [];
}
