import chalk from "chalk";
import { getConfigData, getProfilesData, getDefaultsData } from "../../../data";
import { writeFile } from "../../../helpers/config";
import { cliPrompts, getTitle } from "../../../helpers/prompts";
import { emptyLine, printError, printInfo } from "../../../helpers/print";

const { select, multiselect, toggle } = cliPrompts;

export default async function deleteProfile(): Promise<boolean> {
  const profiles = getProfilesData();
  const browsersWithProfiles = Object.entries(profiles)
    .filter((entry) => Object.keys(entry[1] ?? {}).length > 0)
    .map(([key]) => key);

  if (browsersWithProfiles.length === 0) {
    printError("No profiles currently exist in the config");
    return false;
  }

  async function getBrowserName(): Promise<string | undefined> {
    if (browsersWithProfiles.length === 1) {
      const [browserName] = browsersWithProfiles;

      printInfo(
        `You have ${chalk.yellowBright(
          "1"
        )} browser with profiles: ${chalk.yellowBright(getTitle(browserName))}`
      );

      return browserName;
    }

    if (browsersWithProfiles.length > 1) {
      printInfo(
        `You have ${chalk.yellowBright(
          browsersWithProfiles.length
        )} browsers with profiles`
      );

      emptyLine();
      const browser = await select(
        browsersWithProfiles,
        `Select a ${chalk.yellowBright("browser")} to remove a profile for.\n`
      );

      return browser;
    }

    return undefined;
  }

  const browserName = await getBrowserName();
  if (!browserName) {
    return false;
  }

  const browserProfiles = profiles[browserName] ?? {};
  const profileNames = Object.keys(browserProfiles).sort((a, b) =>
    a.localeCompare(b)
  );

  if (profileNames.length === 0) {
    emptyLine();
    printError(`No profiles exist for ${getTitle(browserName)}`);
    return false;
  }

  async function getListToRemove(): Promise<string[] | undefined> {
    let list: string[] | undefined =
      profileNames.length === 1 ? [profileNames[0]] : undefined;

    if (list == null && browserName != null) {
      emptyLine();
      list = await multiselect(
        profileNames,
        `Select all ${getTitle(browserName)} ${chalk.yellowBright(
          "profiles"
        )} you want to remove.\n`,
        false
      );
    }

    return list;
  }

  const listToRemove = await getListToRemove();

  function getUpdatedProfiles() {
    let updatedProfiles: typeof browserProfiles = {};
    if (listToRemove != null) {
      Object.entries(browserProfiles).forEach(
        ([profileName, browserProfile]) => {
          if (!listToRemove.includes(profileName)) {
            updatedProfiles = {
              ...updatedProfiles,
              [profileName]: browserProfile,
            };
          }
        }
      );
    }

    return updatedProfiles;
  }

  function getUpdatedProfileNames() {
    return Object.keys(getUpdatedProfiles());
  }

  let defaults = getDefaultsData();

  function updateDefaultProfile(newDefaultProfile: string) {
    if (browserName != null) {
      defaults = {
        ...defaults,
        profile: {
          ...defaults.profile,
          [browserName]: newDefaultProfile,
        },
      };
    }
  }

  if (listToRemove == null || listToRemove.length === 0) {
    return false;
  }

  // check if default profile for the browser is in the list
  const currentDefaultProfile = defaults.profile?.[browserName];
  const withDefaultProfile =
    currentDefaultProfile != null &&
    listToRemove.includes(currentDefaultProfile);

  if (!withDefaultProfile || listToRemove.length > 1) {
    emptyLine();
    const proceed = await toggle("Are you sure?\n", false);
    if (!proceed) {
      return false;
    }
  }

  if (withDefaultProfile) {
    emptyLine();
    const proceed = await toggle(
      `"${currentDefaultProfile}" is the ${chalk.yellowBright(
        "default profile"
      )} for ${getTitle(browserName)}. ${chalk.cyanBright("Remove it?")}\n`,
      false
    );

    // remove current default profile from the list of profiles to delete
    if (!proceed) {
      const index = listToRemove.findIndex(
        (profileName) => profileName === currentDefaultProfile
      );

      if (index >= 0) {
        listToRemove.splice(index, 1);
      }
    }
    // get the new default profile for the browser
    else {
      const updatedProfileNames = getUpdatedProfileNames();

      // no profiles are left for the browser
      if (updatedProfileNames.length === 0) {
        // remove browser from profile defaults
        if (defaults.profile != null) {
          delete defaults.profile[browserName];

          // remove defaults.profile if no browsers with profiles left
          if (Object.keys(defaults.profile).length === 0) {
            delete defaults.profile;
          }
        }

        emptyLine();
        printInfo(`${getTitle(browserName)} has no more profiles.`);
      }
      // 1 profile is left -> make it default automatically
      else if (updatedProfileNames.length === 1) {
        const [newDefaultProfile] = updatedProfileNames;
        updateDefaultProfile(newDefaultProfile);

        emptyLine();
        printInfo(
          `"${newDefaultProfile}" is the new default profile for ${getTitle(
            browserName
          )}`
        );
      }
      // more than 1 profile is left -> prompt for new default profile
      else if (updatedProfileNames.length > 1) {
        emptyLine();
        const newDefaultProfile = await select(
          updatedProfileNames,
          `What should be the ${chalk.italic.cyan("new")} ${chalk.yellowBright(
            "default profile"
          )} for ${getTitle(browserName)}?\n`,
          false
        );

        if (newDefaultProfile == null) {
          return false;
        }

        updateDefaultProfile(newDefaultProfile);
      }
    }
  }

  if (listToRemove.length === 0) {
    return false;
  }

  // update config
  const updatedProfilesConfig = {
    ...profiles,
    [browserName]: getUpdatedProfiles(),
  };

  // remove browser from profiles config if no profiles are left for it
  if (getUpdatedProfileNames().length === 0) {
    delete updatedProfilesConfig[browserName];
  }

  let config = getConfigData();
  config = {
    ...config,
    defaults,
    profiles: updatedProfilesConfig,
  };

  // remove "profiles" property from config if no browsers have profiles
  if (Object.keys(updatedProfilesConfig).length === 0) {
    delete config.profiles;
  }

  writeFile("config", config);
  return true;
}
