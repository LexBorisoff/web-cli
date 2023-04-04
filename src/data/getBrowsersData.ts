import getConfigData from "./getConfigData";
import { BrowsersConfig } from "../types/data.types";

export default async function getBrowsersData(): Promise<BrowsersConfig> {
  const config = await getConfigData();
  return config?.browsers ?? [];
}
