import axios from "axios";
import { printError } from "../helpers/print";
import { EnginesConfig } from "../types/config.types";

const url = "https://shell-query.lexborisoff.dev/engines.json";

export default async function fetchEngines(): Promise<EnginesConfig> {
  try {
    const { data: engines } = await axios.get<EnginesConfig>(url);
    return engines;
  } catch {
    printError("Could not fetch engines");
    return {};
  }
}

fetchEngines();
