import * as fs from "fs";
import chalk from "chalk";
import getConfigFileName from "../../getConfigFileName";
import {
  getChoiceTitle,
  getArray,
  select,
  getText,
  toggle,
} from "../../../helpers";
import {
  getConfigData,
  getDefaultsData,
  getBrowsersData,
  getProfilesData,
} from "../../../data";
import { Profile } from "../../../types";

const configFileName = getConfigFileName();
const namePattern = /^[A-Za-z]+$/;
const directoryPattern = /^[A-Za-z0-9 ]+$/;

// PROFILE
async function getProfileAliases(browser: string): Promise<string[]> {
  const profiles = await getProfilesData();

  if (!profiles || !(browser in profiles)) {
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

async function isValidDirectory(
  directory: string,
  browser: string
): Promise<true | string> {
  if (directory.trim() === "") {
    return "Empty values are not allowed";
  }

  if (!directoryPattern.test(directory)) {
    return "Enter a valid directory name";
  }

  const profiles = await getProfilesData();
  if (profiles == null || !(browser in profiles)) {
    return true;
  }

  const directories = Object.values(profiles[browser]).map(
    (profile) => profile.directory
  );

  return !directories.includes(directory)
    ? true
    : `${directory} already exists for ${getChoiceTitle(browser)}`;
}

async function isValidProfileName(
  profileName: string,
  browser: string
): Promise<boolean | string> {
  if (profileName.trim() === "") {
    return "Empty values are not allowed";
  }

  if (!namePattern.test(profileName)) {
    return "Only letters are allowed";
  }

  const profiles = await getProfilesData();
  if (profiles == null || !(browser in profiles)) {
    return true;
  }

  const profileAliases = await getProfileAliases(browser);
  if (profileAliases.includes(profileName)) {
    return `"${profileName}" is an alias for an existing ${getChoiceTitle(
      browser
    )} profile`;
  }

  const browserProfiles = Object.keys(profiles[browser]);
  return !browserProfiles.includes(profileName)
    ? true
    : `"${profileName}" already exists for ${getChoiceTitle(browser)}`;
}

async function isValidAlias(
  aliases: string,
  profileName: string,
  browser: string
): Promise<boolean | string> {
  const list = getArray(aliases);
  if (list.includes(profileName)) {
    return "Alias must differ from the command-line name";
  }

  const profiles = await getProfilesData();
  if (profiles == null || !(browser in profiles)) {
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
    : `These names already exist for ${getChoiceTitle(browser)}: ${found.join(
        ", "
      )} `;
}

interface AddProfileToConfigProps {
  profileName: string;
  profile: Profile;
  browser: string;
  isDefault?: boolean;
}
async function addProfileToConfig({
  profileName,
  profile,
  browser,
  isDefault = false,
}: AddProfileToConfigProps) {
  const config = await getConfigData();
  let defaults = await getDefaultsData();
  let profiles = (await getProfilesData()) ?? {};

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

    emptyLine();
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
      const directory = await getText(
        `What is the ${chalk.italic("exact")} ${chalk.yellow(
          "directory name"
        )} of this profile?\n`,
        async (value) => await isValidDirectory(value, browser)
      );

      if (directory != null) {
        emptyLine();

        const commandLineName = await getText(
          `Create a ${chalk.yellow("command-line name")} for "${directory}".\n`,
          async (value) => await isValidProfileName(value, browser)
        );

        if (commandLineName != null) {
          const profileName = commandLineName.toLowerCase();
          let alias: string[] | undefined = [];

          emptyLine();
          const list = await getText(
            `List 0 or more aliases for ${chalk.yellow(
              profileName
            )} ${chalk.italic.cyanBright("(space or comma separated)")}\n`,
            async (value) => await isValidAlias(value, profileName, browser)
          );

          alias = list != null ? getArray(list) : undefined;

          if (alias != null) {
            const profile: Profile = {
              directory,
              alias,
            };

            let isDefault = true;
            const defaults = (await getDefaultsData()) ?? {};

            if (defaults?.profile?.[browser] != null) {
              emptyLine();
              isDefault = await toggle(
                `Should "${profileName}" be default for ${getChoiceTitle(
                  browser
                )}?\n`,
                false
              );
            }

            await addProfileToConfig({
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
