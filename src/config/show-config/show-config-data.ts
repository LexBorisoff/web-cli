import chalk from "chalk";
import type { IsDefault, WithAlias } from "../../types/config.types.js";
import { getBrowsersData } from "../../data/get-browsers-data.js";
import { print, severity } from "../../helpers/print/severity.js";
import { getEnginesData } from "../../data/get-engines-data.js";
import { ConfigAction } from "../get-config-action.js";

interface PrintDataOptions {
  isDefault?: boolean;
  extra?: string;
}
function printDataInfo<D extends WithAlias>(
  key: string,
  engine: D,
  { isDefault, extra }: PrintDataOptions = {}
) {
  let info = severity.info(key);

  if (engine.alias) {
    info += " | ";
    const aliases = Array.isArray(engine.alias) ? engine.alias : [engine.alias];
    info += aliases.map((alias) => severity.info(alias)).join(" | ");
  }

  if (extra != null) {
    info += extra;
  }

  if (isDefault === true) {
    info += chalk.gray(" (default)");
  }

  print(info);
}

interface HandleDataOptions<T extends WithAlias & IsDefault> {
  extra?: (item: T) => string;
}
function handleData<T extends WithAlias & IsDefault>(
  data: Record<string, T>,
  { extra }: HandleDataOptions<T> = {}
) {
  const entries = Object.entries(data);
  const defaultItem =
    entries.find(([, { isDefault }]) => isDefault) ?? entries.at(0);

  if (defaultItem != null) {
    const [key, item] = defaultItem;
    printDataInfo(key, item, {
      isDefault: true,
      extra: extra?.(item),
    });
  }

  const [defaultKey] = defaultItem ?? [];
  const nonDefaultBrowsers = entries.filter(([key]) => key !== defaultKey);

  nonDefaultBrowsers.forEach(([key, item]) => {
    printDataInfo(key, item, {
      extra: extra?.(item),
    });
  });
}

export const showConfigData = {
  [ConfigAction.Browsers]() {
    const browsers = getBrowsersData();
    handleData(browsers, {
      extra: ({ profiles }) =>
        profiles == null
          ? ""
          : ` [${Object.keys(profiles)
              .map((profile) => severity.warning(profile))
              .join(", ")}]`,
    });
  },

  [ConfigAction.Engines]() {
    const engines = getEnginesData();
    handleData(engines, {
      extra: (engine) => ` > ${severity.success(engine.baseUrl)}`,
    });
  },
};
