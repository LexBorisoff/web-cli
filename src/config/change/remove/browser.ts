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

export default async function removeBrowser(): Promise<boolean> {
  const browsers = getBrowsersData();

  if (browsers.length === 0) {
    printError(`No browsers currently exist in the config`);
    return false;
  }

  const browserNames = browsers.map((browser) =>
    typeof browser === "string" ? browser : browser.name
  );

  const listToRemove =
    browserNames.length > 1
      ? await multiselect(
          browserNames,
          "Select all browsers you want to remove.\n"
        )
      : [...browserNames];

  if (listToRemove == null || listToRemove.length === 0) {
    return false;
  }

  const profiles = getProfilesData();
  let defaults = getDefaultsData();
  const currentDefaultBrowser = defaults.browser;

  const withDefaultBrowser =
    currentDefaultBrowser != null &&
    listToRemove.includes(currentDefaultBrowser);

  // only 1 browser exists in the config and is not default
  if (browserNames.length === 1 && !withDefaultBrowser) {
    const [browserName] = listToRemove;
    const proceed = await toggle(
      `${chalk.yellowBright(
        getTitle(browserName)
      )} is the only config browser. ${chalk.cyanBright("Remove it")}?\n`,
      false
    );

    if (!proceed) {
      return false;
    }
  }

  // confirm removing if browser is not default or if > 1 browser selected
  if (!withDefaultBrowser || listToRemove.length > 1) {
    emptyLine();
    const proceed = await toggle("Are you sure?\n", false);
    if (!proceed) {
      return false;
    }
  }

  // handle removing a default browser
  if (withDefaultBrowser) {
    if (browserNames.length > 1) {
      emptyLine();
    }

    const proceed = await toggle(
      `${getTitle(currentDefaultBrowser)} is the ${chalk.yellowBright(
        "default browser"
      )}. ${chalk.cyanBright("Remove it?")}\n`,
      false
    );

    if (proceed == null) {
      return false;
    }

    // get the new default browser
    if (proceed) {
      const remainingBrowserNames = browserNames.filter(
        (browser) => !listToRemove.includes(browser)
      );

      if (remainingBrowserNames.length > 0) {
        emptyLine();
      }

      let newDefaultBrowser: string | undefined;

      // re-assign a default browser automatically
      if (remainingBrowserNames.length === 1) {
        [newDefaultBrowser] = remainingBrowserNames;
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

        if (newDefaultBrowser == null) {
          return false;
        }
      }

      // set the default browser
      defaults.browser = newDefaultBrowser;

      // set the default profile for the new default browser
      if (
        newDefaultBrowser != null &&
        defaults.profile?.[newDefaultBrowser] == null
      ) {
        const profileNames = Object.keys(profiles[newDefaultBrowser] ?? {});

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
    // exclude the default browser from the list of browsers to remove
    else {
      const index = listToRemove.findIndex(
        (browser) => browser === currentDefaultBrowser
      );

      if (index >= 0) {
        listToRemove.splice(index, 1);
      }
    }
  }

  if (listToRemove.length === 0) {
    return false;
  }

  // remove selected browsers from defaults.profile and profiles config
  listToRemove.forEach((browserName) => {
    delete defaults.profile?.[browserName];
    delete profiles[browserName];
  });

  // remove defaults.profile if no browsers with profiles left
  if (Object.keys(defaults.profile ?? {}).length === 0) {
    delete defaults.profile;
  }

  const config = getConfigData();
  const remainingBrowsers = browsers.filter(
    (browser) =>
      !listToRemove.includes(
        typeof browser === "string" ? browser : browser.name
      )
  );

  writeFile("config", {
    ...config,
    defaults,
    browsers: remainingBrowsers.length > 0 ? remainingBrowsers : undefined,
    profiles: Object.keys(profiles).length > 0 ? profiles : undefined,
  });

  return true;
}
