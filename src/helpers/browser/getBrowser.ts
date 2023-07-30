import { getConfigItem } from "../config";
import { getBrowsersData } from "../../data";
import { Browser } from "../../types/config.types";

const browsersData = getBrowsersData();

export default function getBrowser(
  profileNameOrAlias: string
): [string, Browser] | undefined {
  return getConfigItem(profileNameOrAlias, browsersData);
}
