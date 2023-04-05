import * as fs from "fs";
import chalk from "chalk";
import {
  getConfigData,
  getDefaultsData,
  getBrowsersData,
  getProfilesData,
} from "../../../data";
import { getConfigFileName } from "../../../helpers/config";
import { cliPrompts, getTitle, getArray } from "../../../helpers/prompts";
import { namePattern, directoryPattern } from "../../../helpers/patterns";
import { emptyLine } from "../../../helpers/print";
import { Profile } from "../../../types/data.types";
import { TextAnswer } from "../../../types/config.types";

const { select, text, toggle } = cliPrompts;
const answer: TextAnswer = {};

const configFileName = getConfigFileName();

async function getProfileAliases(browser: string): Promise<string[]> {
  const profiles = await getProfilesData();

  if (!(browser in profiles)) {
    return [];
  }

  let aliases: string[] = [];
  const browserProfiles = profiles[browser];

  Object.values(browserProfiles).forEach((profile) => {
    const { alias } = profile;
    if (alias != null) {
      aliases = Array.isArray(alias)
        ? [...aliases, ...alias]
        : [...aliases, alias];
    }
  });

  return aliases;
}

async function validateDirectory(
  value: string,
  browser: string
): Promise<true | string> {
  const directory = value.trim();
  if (directory === "") {
    return "Empty values are not allowed";
  }

  if (!directoryPattern.test(directory)) {
    return "Enter a valid directory name";
  }

  const profiles = await getProfilesData();
  if (!(browser in profiles)) {
    return true;
  }

  const directories = Object.values(profiles[browser]).map(
    (profile) => profile.directory
  );

  return !directories.includes(directory)
    ? true
    : `${directory} already exists for ${getTitle(browser)}`;
}

async function validateProfileName(
  profileName: string,
  browser: string
): Promise<boolean | string> {
  if (profileName.trim() === "") {
    return "Empty values are not allowed";
  }

  if (!namePattern.test(profileName.trim())) {
    return "Only letters are allowed";
  }

  const profiles = await getProfilesData();
  if (!(browser in profiles)) {
    return true;
  }

  const profileAliases = await getProfileAliases(browser);
  if (profileAliases.includes(profileName)) {
    return `"${profileName}" is an alias for an existing ${getTitle(
      browser
    )} profile`;
  }

  const browserProfiles = Object.keys(profiles[browser]);
  return !browserProfiles.includes(profileName)
    ? true
    : `"${profileName}" already exists for ${getTitle(browser)}`;
}

async function validateAlias(
  aliases: string,
  profileName: string,
  browser: string
): Promise<boolean | string> {
  const list = getArray(aliases);
  if (list.includes(profileName)) {
    return "Alias must differ from the command-line name";
  }

  const profiles = await getProfilesData();
  if (!(browser in profiles)) {
    return true;
  }

  const found: string[] = [];
  const browserProfiles = Object.keys(profiles[browser]);
  const profileAliases = await getProfileAliases(browser);

  browserProfiles.forEach((profile) => {
    if (list.includes(profile)) {
      found.push(profile);
    }
  });

  profileAliases.forEach((alias) => {
    if (list.includes(alias)) {
      found.push(alias);
    }
  });

  return found.length === 0
    ? true
    : `These names/aliases already exist for ${getTitle(browser)}: ${found.join(
        ", "
      )} `;
}

interface AddToConfigProps {
  profileName: string;
  profile: Profile;
  browser: string;
  isDefault?: boolean;
}
async function addToConfig({
  profileName,
  profile,
  browser,
  isDefault = false,
}: AddToConfigProps): Promise<void> {
  const config = await getConfigData();
  let defaults = await getDefaultsData();
  let profiles = await getProfilesData();

  profiles = {
    ...profiles,
    [browser]: {
      ...profiles[browser],
      [profileName]: {
        ...profile,
      },
    },
  };

  if (isDefault) {
    defaults = {
      ...defaults,
      profile: {
        ...(defaults.profile ?? {}),
        [browser]: profileName,
      },
    };
  }

  const json = JSON.stringify({ ...config, defaults, profiles });
  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }
  });
}

export default async function addProfile(): Promise<boolean> {
  const browsers = await getBrowsersData();
  if (browsers.length > 0) {
    const browserList = browsers.map((browser) =>
      typeof browser === "string" ? browser : browser.name
    );

    const browser = await select(
      browserList,
      `Select a ${chalk.yellow("browser")} to add a profile for.\n`
    );

    if (browser != null) {
      emptyLine();
      answer.directory = await text(
        `What is the ${chalk.italic.cyan("exact")} ${chalk.yellow(
          "directory name"
        )} of this profile?\n`,
        async (value) => await validateDirectory(value, browser)
      );

      if (answer.directory != null) {
        emptyLine();

        const directory = answer.directory.trim();
        answer.profileName = await text(
          `Create a ${chalk.yellow("command-line name")} ${chalk.cyan(
            "(lowercase)"
          )} for "${directory}".\n`,
          async (value) => await validateProfileName(value, browser)
        );

        if (answer.profileName != null) {
          const profileName = answer.profileName.trim().toLowerCase();

          emptyLine();
          answer.alias = await text(
            `List 0 or more aliases for ${chalk.yellow(
              profileName
            )} ${chalk.italic.cyanBright("(space or comma separated)")}\n`,
            async (value) => await validateAlias(value, profileName, browser)
          );

          const alias: string[] | undefined =
            answer.alias != null ? getArray(answer.alias) : undefined;

          if (alias != null) {
            const profile: Profile = {
              directory,
              alias,
            };

            let isDefault = true;
            const defaults = (await getDefaultsData()) ?? {};

            if (
              defaults?.profile?.[browser] != null &&
              defaults.profile[browser] !== profileName
            ) {
              emptyLine();
              isDefault = await toggle(
                `Should "${profileName}" be default for ${getTitle(
                  browser
                )}?\n`,
                false
              );
            }

            await addToConfig({
              profileName,
              profile,
              browser,
              isDefault,
            });

            return true;
          }
        }
      }
    }
  }

  return false;
}
