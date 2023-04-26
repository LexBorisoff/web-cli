import chalk from "chalk";
import {
  getConfigData,
  getDefaultsData,
  getBrowsersData,
  getProfilesData,
} from "../../../data";
import { writeConfigFile } from "../../../helpers/config";
import {
  cliPrompts,
  getTitle,
  getUniqueArrayLowerCase,
} from "../../../helpers/prompts";
import {
  lettersNumbersPattern,
  directoryPattern,
} from "../../../helpers/patterns";
import { emptyLine } from "../../../helpers/print";
import { Profile } from "../../../types/data.types";
import { TextAnswer } from "../../../types/config.types";

const { select, text, toggle } = cliPrompts;
const answer: TextAnswer = {};

async function getProfileAliases(browser: string): Promise<string[]> {
  const profiles = await getProfilesData();

  if (!(browser in profiles)) {
    return [];
  }

  let aliases: string[] = [];
  const browserProfiles = profiles[browser] ?? {};

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

  const browserProfiles = profiles[browser] ?? {};
  const directories = Object.values(browserProfiles).map(
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

  if (!lettersNumbersPattern.test(profileName.trim())) {
    return "Only letters and number are allowed";
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

  const browserProfiles = profiles[browser] ?? {};
  const profileNames = Object.keys(browserProfiles);

  return !profileNames.includes(profileName)
    ? true
    : `"${profileName}" already exists for ${getTitle(browser)}`;
}

async function validateAlias(
  aliases: string,
  profileName: string,
  browser: string
): Promise<boolean | string> {
  const list = getUniqueArrayLowerCase(aliases);
  if (list.includes(profileName.toLowerCase())) {
    return "Alias must differ from the command-line name";
  }

  if (list.find((alias) => !lettersNumbersPattern.test(alias)) != null) {
    return "Only letters and numbers are allowed for an alias name.";
  }

  const profiles = await getProfilesData();
  if (!(browser in profiles)) {
    return true;
  }

  const found: string[] = [];
  const browserProfiles = profiles[browser] ?? {};
  const profileNames = Object.keys(browserProfiles);

  const profileAliases = await getProfileAliases(browser);

  profileNames.forEach((profile) => {
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

  writeConfigFile({ ...config, defaults, profiles });
}

export default async function addProfile(): Promise<boolean> {
  const browsers = await getBrowsersData();
  if (browsers.length > 0) {
    const browserList = browsers.map((browser) =>
      typeof browser === "string" ? browser : browser.name
    );

    const browser = await select(
      browserList,
      `Select a ${chalk.yellowBright("browser")} to add a profile for.\n`
    );

    if (browser != null) {
      emptyLine();
      answer.directory = await text(
        `What is the ${chalk.italic.cyan("exact")} ${chalk.yellowBright(
          "directory name"
        )} of this profile?\n`,
        async (value) => await validateDirectory(value, browser)
      );

      if (answer.directory != null) {
        emptyLine();

        const directory = answer.directory.trim();
        answer.profileName = await text(
          `Create a ${chalk.yellowBright("command-line name")} ${chalk.cyan(
            "(lowercase)"
          )} for "${directory}".\n`,
          async (value) => await validateProfileName(value, browser)
        );

        if (answer.profileName != null) {
          const profileName = answer.profileName.trim().toLowerCase();

          emptyLine();
          answer.alias = await text(
            `List 0 or more aliases for ${chalk.yellowBright(
              profileName
            )} ${chalk.italic.cyanBright("(space or comma separated)")}\n`,
            async (value) => await validateAlias(value, profileName, browser)
          );

          const alias: string[] | undefined =
            answer.alias != null
              ? getUniqueArrayLowerCase(answer.alias)
              : undefined;

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
