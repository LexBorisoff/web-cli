import * as fs from "fs";
import prompts from "prompts";
import chalk from "chalk";
import getConfigFileName from "../getConfigFileName";
import {
  emptyLine,
  getChoices,
  getChoiceTitle,
  getArray,
  select,
  getText,
  keepGoing,
} from "../../helpers";
import { getConfigData, getBrowsersData, getProfilesData } from "../../data";
import {
  ConfigType,
  PromptAnswer,
  PromptChoice,
  BrowserProfiles,
  ProfilesConfig,
} from "../../types";

const configFileName = getConfigFileName();

function addDefault() {
  console.log("add default");
}

function addBrowser() {
  console.log("add browser");
}

// PROFILE
async function isValidDirectory(
  directory: string,
  browser: string
): Promise<true | string> {
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

async function getProfileAliases(browser: string): Promise<string[]> {
  const profiles = await getProfilesData();

  if (!profiles || !(browser in profiles)) {
    return [];
  }

  const browserProfiles = profiles[browser];

  let aliases: string[] = [];
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

async function isValidProfileName(
  profileName: string,
  browser: string
): Promise<boolean | string> {
  if (!/^[A-Za-z]+$/.test(profileName)) {
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
  browser: string
): Promise<boolean | string> {
  const profiles = await getProfilesData();

  if (profiles == null || !(browser in profiles)) {
    return true;
  }

  const list = getArray(aliases);

  let found: string[] = [];
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

async function addProfileToConfig(profile: BrowserProfiles, browser: string) {
  const config = await getConfigData();
  let profiles: ProfilesConfig = (await getProfilesData()) ?? {};

  profiles = {
    ...profiles,
    [browser]: {
      ...profiles[browser],
      ...profile,
    },
  };

  const json = JSON.stringify({ ...config, profiles });
  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }

    emptyLine();
  });
}

async function addProfile() {
  const browsers = await getBrowsersData();
  if (browsers.length > 0) {
    const browserList = browsers.map((browser) =>
      typeof browser === "string" ? browser : browser.name
    );

    browserList.sort((a, b) => a.localeCompare(b));

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

        let profileName = await getText(
          `Create a ${chalk.yellow("command-line name")} for "${directory}".\n`,
          async (value) => await isValidProfileName(value, browser)
        );

        if (profileName != null) {
          profileName = profileName.toLowerCase();
          let alias: string[] | undefined = [];

          emptyLine();
          const yes = await keepGoing(
            `Do you want to set ${chalk.yellow(
              "aliases"
            )} for "${profileName}"?\n`,
            true
          );

          if (yes) {
            emptyLine();

            const list = await getText(
              `List 1 or more aliases for ${chalk.yellow(
                profileName
              )} ${chalk.italic.cyanBright("(space or comma separated)")}\n`,
              async (value) => isValidAlias(value, browser)
            );

            alias = list != null ? getArray(list) : undefined;
          }

          if (alias != null) {
            const profile: BrowserProfiles = {
              [profileName]: {
                directory,
                alias,
              },
            };

            addProfileToConfig(profile, browser);
          }
        }
      }
    }
  }
}

async function add(type: ConfigType) {
  if (type === "default") {
    await addDefault();
  } else if (type === "browser") {
    await addBrowser();
  } else if (type === "profile") {
    await addProfile();
  }
}

export default async function addConfig(type?: ConfigType) {
  if (type != null) {
    await add(type);
    return;
  }

  const configTypes: ConfigType[] = ["default", "browser", "profile"];
  const choices: PromptChoice[] = getChoices(configTypes);

  const { answer: configType }: PromptAnswer<ConfigType> = await prompts({
    name: "answer",
    type: "select",
    choices,
    message: `What ${chalk.yellow("config")} do you want to add?\n`,
    instructions: false,
    hint: "- Space/←/→ to toggle selection. Enter to submit.",
  });

  if (configType != null) {
    emptyLine();
    await add(configType);
  }
}
