import chalk from "chalk";
import { getConfigData, getProfilesData, getDefaultsData } from "../../../data";
import { writeConfigFile } from "../../../helpers/config";
import { cliPrompts, getTitle } from "../../../helpers/prompts";
import { emptyLine } from "../../../helpers/print";

const { select, toggle } = cliPrompts;

const printError = (message: string) => console.log(chalk.red(message));
const printInfo = (message: string) => console.log(chalk.cyan(message));

async function removeBrowserFromDefaults(browser: string) {
  let defaults = await getDefaultsData();
  const defaultProfiles: typeof defaults.profile = { ...defaults.profile };
  delete defaultProfiles[browser];

  // if at least 1 browser with profiles exists -> update "profile" property
  if (Object.keys(defaultProfiles).length > 0) {
    defaults = {
      ...defaults,
      profile: defaultProfiles,
    };
  }
  // if no browsers with profiles exist -> remove "profile" property
  else {
    delete defaults.profile;
  }

  return defaults;
}

export default async function deleteProfile(): Promise<boolean> {
  const profiles = await getProfilesData();
  const browsersWithProfiles = Object.keys(profiles);

  if (browsersWithProfiles.length === 0) {
    printError("No profiles currently exist");
    return false;
  }

  async function deleteOne(browser: string) {
    const browserProfiles = profiles[browser] ?? {};
    const profileNames = Object.keys(browserProfiles);

    if (profileNames.length === 0) {
      printError(`No profiles exist for ${getTitle(browser)}`);
      return false;
    }

    const profileToDelete = await select(
      profileNames,
      `Select a ${getTitle(browser)} ${chalk.yellow(
        "profile"
      )} to delete from this config.\n`,
      false
    );

    if (profileToDelete != null) {
      if (profileNames.length > 1) {
        // otherwise the above select question returns without displaying
        emptyLine();
      }

      // check if delete profile is the default for this browser
      let defaults = await getDefaultsData();
      const currentDefaultProfile = defaults.profile?.[browser];

      if (profileToDelete === currentDefaultProfile) {
        const yes = await toggle(
          `"${profileToDelete}" is the ${chalk.yellow(
            "default profile"
          )} for ${getTitle(browser)}. Delete it?\n`,
          true
        );

        if (!yes) {
          return false;
        }
      }

      let config = await getConfigData();

      // updated profiles for the browser
      let updatedProfiles: typeof browserProfiles = {};
      Object.entries(browserProfiles).forEach(([profileName, profileValue]) => {
        if (profileName !== profileToDelete) {
          updatedProfiles = {
            ...updatedProfiles,
            [profileName]: profileValue,
          };
        }
      });

      // list of updated profile names
      const updatedProfileNames = Object.keys(updatedProfiles);

      // if default profile is deleted for the browser
      if (
        currentDefaultProfile != null &&
        currentDefaultProfile === profileToDelete
      ) {
        emptyLine();

        // no profiles are left for the browser
        if (updatedProfileNames.length === 0) {
          defaults = await removeBrowserFromDefaults(browser);
          printInfo(`${getTitle(browser)} has no more profiles.`);
        }
        // 1 profile is left -> make it default automatically
        else if (updatedProfileNames.length === 1) {
          const newDefaultProfile = updatedProfileNames[0];
          defaults = {
            ...defaults,
            profile: {
              ...defaults.profile,
              [browser]: newDefaultProfile,
            },
          };

          printInfo(
            `"${newDefaultProfile}" is the new default profile for ${getTitle(
              browser
            )}`
          );
        }
        // more than 1 profile is left
        else if (updatedProfileNames.length > 1) {
          const newDefaultProfile = await select(
            updatedProfileNames,
            `What should be the ${chalk.italic.cyan("new")} ${chalk.yellow(
              "default profile"
            )} for ${getTitle(browser)}?\n`,
            false
          );

          if (newDefaultProfile == null) {
            printError("Default profile must be selected.");
            return false;
          }

          defaults = {
            ...defaults,
            profile: { ...defaults.profile, [browser]: newDefaultProfile },
          };
        }
      }

      const updatedProfilesConfig = {
        ...profiles,
        [browser]: updatedProfiles,
      };

      // remove browser from profiles config, if no profiles are left for it
      if (updatedProfileNames.length === 0) {
        delete updatedProfilesConfig[browser];
      }

      config = {
        ...config,
        defaults,
        profiles: updatedProfilesConfig,
      };

      // remove "profiles" property from config, if no browsers have profiles
      if (Object.keys(updatedProfilesConfig).length === 0) {
        delete config.profiles;
      }

      writeConfigFile(config);
      return true;
    }

    return false;
  }

  if (browsersWithProfiles.length === 1) {
    const [browser] = browsersWithProfiles;
    return deleteOne(browser);
  }

  if (browsersWithProfiles.length > 1) {
    const browser = await select(
      browsersWithProfiles,
      "Select a browser to delete a profile for.\n"
    );

    if (!browser) {
      return false;
    }

    emptyLine();
    return deleteOne(browser);
  }

  return false;
}
