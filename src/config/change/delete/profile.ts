import chalk from "chalk";
import { getConfigData, getProfilesData, getDefaultsData } from "../../../data";
import { writeConfigFile } from "../../../helpers/config";
import { cliPrompts, getTitle } from "../../../helpers/prompts";
import { emptyLine } from "../../../helpers/print";

const { select, multiselect, toggle } = cliPrompts;

const printError = (message: string) => console.log(chalk.red(message));
const printInfo = (message: string) => console.log(chalk.cyan(message));

async function removeBrowserFromProfileDefaults(browserName: string) {
  const defaults = await getDefaultsData();

  if (defaults.profile != null) {
    delete defaults.profile[browserName];

    // remove "profile" property if no browsers with profiles exist
    if (Object.keys(defaults.profile).length === 0) {
      delete defaults.profile;
    }
  }

  return defaults;
}

export default async function deleteProfiles(): Promise<boolean> {
  const profiles = await getProfilesData();
  const browsersWithProfiles = Object.entries(profiles)
    .filter((entry) => Object.keys(entry[1] ?? {}).length > 0)
    .map(([key]) => key);

  if (browsersWithProfiles.length === 0) {
    printError("No profiles currently exist");
    return false;
  }

  async function getBrowserName(): Promise<string | undefined> {
    if (browsersWithProfiles.length === 1) {
      const [browserName] = browsersWithProfiles;

      printInfo(
        `You have ${chalk.yellow("1")} browser with profiles: ${chalk.yellow(
          getTitle(browserName)
        )}`
      );

      return browserName;
    }

    if (browsersWithProfiles.length > 1) {
      printInfo(
        `You have ${chalk.yellow(
          browsersWithProfiles.length
        )} browsers with profiles`
      );

      emptyLine();
      const browser = await select(
        browsersWithProfiles,
        `Select a ${chalk.yellow("browser")} to delete a profile for.\n`
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

  async function getListToDelete(): Promise<string[] | undefined> {
    let list: string[] | undefined =
      profileNames.length === 1 ? [profileNames[0]] : undefined;

    if (list == null && browserName != null) {
      emptyLine();
      list = await multiselect(
        profileNames,
        `Select all ${getTitle(browserName)} ${chalk.yellow(
          "profiles"
        )} you want to delete.\n`,
        false
      );
    }

    return list;
  }

  const listToDelete = await getListToDelete();

  function getUpdatedProfiles() {
    let updatedProfiles: typeof browserProfiles = {};
    if (listToDelete != null) {
      Object.entries(browserProfiles).forEach(
        ([profileName, browserProfile]) => {
          if (!listToDelete.includes(profileName)) {
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

  let defaults = await getDefaultsData();

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

  if (listToDelete != null && listToDelete.length > 0) {
    emptyLine();
    let yes = await toggle("Are you sure?\n", true);

    if (!yes) {
      return false;
    }

    // check if default profile for the browser is in the list
    const currentDefaultProfile = defaults.profile?.[browserName];

    if (
      currentDefaultProfile != null &&
      listToDelete.includes(currentDefaultProfile)
    ) {
      emptyLine();
      yes = await toggle(
        `"${currentDefaultProfile}" is the ${chalk.yellow(
          "default profile"
        )} for ${getTitle(browserName)}. ${chalk.redBright("Delete it?")}\n`,
        true
      );

      // remove current default profile from the list of profiles to delete
      if (!yes) {
        const index = listToDelete.findIndex(
          (profileName) => profileName === currentDefaultProfile
        );

        if (index >= 0) {
          listToDelete.splice(index, 1);
        }
      }
      // get the new default profile for the browser
      else {
        const updatedProfileNames = getUpdatedProfileNames();

        // no profiles are left for the browser
        if (updatedProfileNames.length === 0) {
          defaults = await removeBrowserFromProfileDefaults(browserName);

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
            `What should be the ${chalk.italic.cyan("new")} ${chalk.yellow(
              "default profile"
            )} for ${getTitle(browserName)}?\n`,
            false
          );

          if (newDefaultProfile == null) {
            emptyLine();
            printError("Default profile must be selected.");
            return false;
          }

          updateDefaultProfile(newDefaultProfile);
        }
      }
    }

    // update config
    if (listToDelete.length > 0) {
      const updatedProfilesConfig = {
        ...profiles,
        [browserName]: getUpdatedProfiles(),
      };

      // remove browser from profiles config if no profiles are left for it
      if (getUpdatedProfileNames().length === 0) {
        delete updatedProfilesConfig[browserName];
      }

      let config = await getConfigData();
      config = {
        ...config,
        defaults,
        profiles: updatedProfilesConfig,
      };

      // remove "profiles" property from config if no browsers have profiles
      if (Object.keys(updatedProfilesConfig).length === 0) {
        delete config.profiles;
      }

      writeConfigFile(config);
      return true;
    }
  }

  return false;
}
