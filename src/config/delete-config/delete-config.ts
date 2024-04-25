import { prompts } from "../../helpers/utils/prompts.js";
import { printError } from "../../helpers/print/severity.js";
import { getBrowsersData } from "../../data/get-browsers-data.js";
import { writeConfigFile } from "../write-config-file.js";
import { getEnginesData } from "../../data/get-engines-data.js";
import { getConfigData } from "../../data/get-config-data.js";

const configData = getConfigData();
const hasEngines = Object.keys(configData.engines ?? {}).length > 0;
const choices: ("engines" | "browsers")[] = hasEngines
  ? ["engines", "browsers"]
  : ["browsers"];

async function handleDelete<D extends object>(
  data: Record<string, D>,
  name: (typeof choices)[number]
): Promise<Record<string, D> | undefined> {
  const keys = Object.keys(data);

  const { selected } = await prompts.multiselect({
    name: "selected",
    message: `Select ${name} to delete`,
    choices: keys.map((value) => ({ title: value, value })),
    instructions: false,
  });

  if (selected == null) {
    return undefined;
  }

  return Object.entries(data).reduce<Record<string, D>>(
    (result, [key, item]) =>
      selected.includes(key) ? result : { ...result, [key]: item },
    {}
  );
}

export async function deleteConfig() {
  const { answer } = await prompts.select({
    name: "answer",
    message: "Choose data to delete",
    choices: choices.map((value) => ({ title: value, value })),
    instructions: false,
  });

  if (answer === "engines") {
    if (configData.engines != null) {
      const data = getEnginesData();

      // TODO: confirm

      configData.engines = (await handleDelete(data, "engines")) ?? {};
    }
  } else if (answer === "browsers") {
    if (configData.browsers != null) {
      const data = getBrowsersData();

      // TODO: confirm

      configData.browsers = (await handleDelete(data, "browsers")) ?? {};
    }
  }

  try {
    writeConfigFile(configData);
  } catch {
    printError("Could not write to config file");
  }
}
