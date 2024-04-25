import { prompts } from "../../helpers/utils/prompts.js";
import { getConfigFilePath } from "../../helpers/config/get-config-path.js";
import { printError } from "../../helpers/print/severity.js";
import { getBrowsersData } from "../../data/get-browsers-data.js";
import { readFile } from "../../helpers/utils/read-file.js";
import { parseData } from "../../helpers/utils/parse-data.js";
import { ConfigDataJson } from "../../types/config.types.js";
import { writeConfigFile } from "../write-config-file.js";
import { getEnginesData } from "../../data/get-engines-data.js";

const choices = ["engines", "browsers"] as const;

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

  const filePath = getConfigFilePath();
  const contents = readFile(filePath);
  const configData = parseData<ConfigDataJson>(contents) ?? {};

  if (answer === "engines") {
    if (configData.engines != null) {
      const data = getEnginesData();
      configData.engines = (await handleDelete(data, "engines")) ?? {};
    }
  } else if (answer === "browsers") {
    if (configData.browsers != null) {
      const data = getBrowsersData();
      configData.browsers = (await handleDelete(data, "browsers")) ?? {};
    }
  }

  try {
    writeConfigFile(configData);
  } catch {
    printError("Could not write to config file");
  }
}
