import chalk from "chalk";
import {
  getConfigData,
  getDefaultsData,
  getBrowsersData,
  getProfilesData,
} from "../../../data";
import { writeFile } from "../../../helpers/config";
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

function getProfileAliases(browser: string): string[] {
  const profiles = getProfilesData();

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

function validateDirectory(value: string, browser: string): true | string {
  const directory = value.trim();
  if (directory === "") {
    return "Empty values are not allowed";
  }

  if (!directoryPattern.test(directory)) {
    return "Enter a valid directory name";
  }

  const profiles = getProfilesData();
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

function validateProfileName(
  profileName: string,
  browser: string
): boolean | string {
  if (profileName.trim() === "") {
    return "Empty values are not allowed";
  }

  if (!lettersNumbersPattern.test(profileName.trim())) {
    return "Only letters and number are allowed";
  }

  const profiles = getProfilesData();
  if (!(browser in profiles)) {
    return true;
  }

  const profileAliases = getProfileAliases(browser);
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

function validateAlias(
  aliases: string,
  profileName: string,
  browser: string
): boolean | string {
  const list = getUniqueArrayLowerCase(aliases);
  if (list.includes(profileName.toLowerCase())) {
    return "Alias must differ from the command-line name";
  }

  if (list.find((alias) => !lettersNumbersPattern.test(alias)) != null) {
    return "Only letters and numbers are allowed for an alias name.";
  }

  const profiles = getProfilesData();
  if (!(browser in profiles)) {
    return true;
  }

  const found: string[] = [];
  const browserProfiles = profiles[browser] ?? {};
  const profileNames = Object.keys(browserProfiles);

  const profileAliases = getProfileAliases(browser);

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
function addToConfig({
  profileName,
  profile,
  browser,
  isDefault = false,
}: AddToConfigProps): void {
  const config = getConfigData();
  let defaults = getDefaultsData();
  let profiles = getProfilesData();

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

  writeFile("config", {
    ...config,
    defaults,
    profiles,
  });
}

export default async function addProfile(): Promise<boolean> {
  const browsers = getBrowsersData();
  if (browsers.length > 0) {
    const browserList = browsers.map((browser) =>
      typeof browser === "string" ? browser : browser.name
    );

    const browser = await select(
      browserList,
      `Select a ${chalk.yellowBright("browser")} to add a profile for.\n`
    );

    if (browser != null) {
      if (browsers.length > 1) {
        emptyLine();
      }

      answer.directory = await text(
        `What is the ${chalk.italic.cyan("exact")} ${chalk.yellowBright(
          "directory name"
        )} of this profile?\n`,
        (value) => validateDirectory(value, browser)
      );

      if (answer.directory != null) {
        emptyLine();

        const directory = answer.directory.trim();
        answer.profileName = await text(
          `Create a ${chalk.yellowBright("command-line name")} ${chalk.cyan(
            "(lowercase)"
          )} for "${directory}".\n`,
          (value) => validateProfileName(value, browser)
        );

        if (answer.profileName != null) {
          const profileName = answer.profileName.trim().toLowerCase();

          emptyLine();
          answer.alias = await text(
            `List 0 or more aliases for ${chalk.yellowBright(
              profileName
            )} ${chalk.italic.cyanBright("(space or comma separated)")}\n`,
            (value) => validateAlias(value, profileName, browser)
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
            const defaults = getDefaultsData() ?? {};

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

            addToConfig({
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
