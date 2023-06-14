import chalk from "chalk";
import {
  getConfigData,
  getDefaultsData,
  getBrowsersData,
  getProfilesData,
} from "../../../data";
import { writeFile } from "../../../helpers/config";
import { cliPrompts, getTitle } from "../../../helpers/prompts";
import { emptyLine, printInfo, printError } from "../../../helpers/print";

const { select, multiselect, toggle } = cliPrompts;

export default async function deleteBrowsers(): Promise<boolean> {
  const browsers = getBrowsersData();

  if (browsers.length === 0) {
    printError(`No browsers currently exist in the config`);
    return false;
  }

  const browserNames = browsers.map((browser) =>
    typeof browser === "string" ? browser : browser.name
  );

  const listToDelete = await multiselect(
    browserNames,
    "Select all browsers you want to delete.\n"
  );

  if (listToDelete == null) {
    return false;
  }

  emptyLine();
  let yes = await toggle("Are you sure?\n", true);

  if (!yes) {
    return false;
  }

  const profiles = getProfilesData();
  let defaults = getDefaultsData();
  const currentDefaultBrowser = defaults.browser;

  // deleting a default browser
  if (
    currentDefaultBrowser != null &&
    listToDelete.includes(currentDefaultBrowser)
  ) {
    emptyLine();

    yes = await toggle(
      `${getTitle(currentDefaultBrowser)} is the ${chalk.yellowBright(
        "default browser"
      )}. ${chalk.redBright("Delete it?")}\n`,
      true
    );

    if (!yes) {
      // remove current default browser from the list of browsers to delete
      const index = listToDelete.findIndex(
        (browser) => browser === currentDefaultBrowser
      );

      if (index >= 0) {
        listToDelete.splice(index, 1);
      }
    }
    // get the new default browser
    else {
      const remainingBrowserNames = browserNames.filter(
        (browser) => !listToDelete.includes(browser)
      );

      let newDefaultBrowser: string | undefined = remainingBrowserNames[0];
      emptyLine();

      // re-assign a default browser automatically
      if (remainingBrowserNames.length === 1) {
        printInfo(`${getTitle(newDefaultBrowser)} is the new default browser.`);
      }
      // choose a new default browser
      else if (remainingBrowserNames.length > 1) {
        newDefaultBrowser = await select(
          remainingBrowserNames,
          `What should be the ${chalk.italic.cyan("new")} ${chalk.yellowBright(
            "default browser"
          )}?\n`
        );
      }

      if (newDefaultBrowser == null) {
        emptyLine();
        printError("Default browser must be selected.");
        return false;
      }

      defaults = {
        ...defaults,
        browser: newDefaultBrowser,
      };

      delete defaults.profile?.[currentDefaultBrowser];

      // set the default profile for the new default browser
      if (defaults.profile?.[newDefaultBrowser] == null) {
        const browserProfiles = profiles[newDefaultBrowser] ?? {};
        const profileNames = Object.keys(browserProfiles);

        if (profileNames.length === 1) {
          defaults = {
            ...defaults,
            profile: {
              ...defaults.profile,
              [newDefaultBrowser]: profileNames[0],
            },
          };
        } else if (profileNames.length > 1) {
          emptyLine();
          const defaultProfile = await select(
            profileNames,
            `What should the ${chalk.yellowBright(
              "default profile"
            )} for ${getTitle(newDefaultBrowser)}\n`,
            false
          );

          if (defaultProfile == null) {
            emptyLine();
            printError(
              "Default profile must be selected for the new default browser"
            );
            return false;
          }

          defaults = {
            ...defaults,
            profile: {
              ...defaults.profile,
              [newDefaultBrowser]: defaultProfile,
            },
          };
        }
      }
    }
  }

  // update config
  if (listToDelete.length > 0) {
    // delete selected browsers from defaults and profiles config
    listToDelete.forEach((browserName) => {
      delete defaults.profile?.[browserName];
      delete profiles[browserName];
    });

    const config = getConfigData();
    const remainingBrowsers = browsers.filter(
      (browser) =>
        !listToDelete.includes(
          typeof browser === "string" ? browser : browser.name
        )
    );

    writeFile("config", {
      ...config,
      defaults,
      browsers: remainingBrowsers,
      profiles,
    });

    return true;
  }

  return false;
}
