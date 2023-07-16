import chalk from "chalk";
import { getEnginesData } from "../../../data";
import { cliPrompts } from "../../../helpers/prompts";
import { enginePattern, baseUrlPattern } from "../../../helpers/patterns";
import { emptyLine } from "../../../helpers/print";
import { TextAnswer } from "../../../types/config.types";

const { text } = cliPrompts;
const answer: TextAnswer = {};

function validateEngineName(value: string): true | string {
  const providedName = value.trim();
  if (!enginePattern.test(providedName)) {
    return "Invalid engine name";
  }

  const engines = getEnginesData();
  if (Object.keys(engines).length > 0) {
    const engineNames = Object.values(engines).map((engine) =>
      engine.name.toLowerCase()
    );

    if (engineNames.includes(providedName.toLowerCase())) {
      const found = Object.values(engines).find(
        (engine) => engine.name.toLowerCase() === providedName.toLowerCase()
      );

      let engineName = value;
      if (found) {
        engineName = found.name;
      }

      return `${engineName} already exists`;
    }
  }

  return true;
}

function validateBaseUrl(value: string): true | string {
  const providedUrl = value.trim();
  return baseUrlPattern.test(providedUrl) || "Invalid base URL";
}

function removeWhiteSpace(value: string) {
  let result = "";
  for (let i = 0; i < value.length; i++) {
    if (value[i] !== " " && value[i] !== "\t") {
      result = `${result}${value[i]}`;
    }
  }
  return result;
}

export default async function addEngine(): Promise<boolean> {
  answer.engineName = await text(
    `Type the ${chalk.yellowBright(
      "engine's name"
    )} you want to add ${chalk.italic.cyanBright(`(e.g. "Google")`)}\n`,
    (value) => validateEngineName(value)
  );

  if (answer.engineName == null) {
    return false;
  }

  const engineName = answer.engineName.trim();

  emptyLine();
  answer.baseUrl = await text(
    `Provide ${engineName}'${
      !engineName.toLowerCase().endsWith("s") && "s"
    } ${chalk.yellowBright("base URL")} ${chalk.italic.cyanBright(
      `(e.g. "${removeWhiteSpace(engineName.toLowerCase())}.com")`
    )}\n`,
    validateBaseUrl
  );

  if (answer.baseUrl == null) {
    return false;
  }

  const baseUrl = answer.baseUrl.trim();

  emptyLine();

  return true;
}
