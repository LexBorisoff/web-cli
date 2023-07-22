import axios from "axios";
import { printError } from "../helpers/print";
import { EnginesData } from "../types/config.types";

const url = "https://shell-query.lexborisoff.dev/engines.json";

export default async function fetchEngines(): Promise<EnginesData> {
  try {
    const { data: engines } = await axios.get<EnginesData>(url);
    return engines;
  } catch {
    printError("Could not fetch engines");
    return {};
  }
}

fetchEngines();
