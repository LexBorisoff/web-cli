import { ConfigOption } from "./utils/config-option.enum.js";
import { createConfig } from "./actions/create-config/create-config.js";
import { getConfigAction } from "./get-config-option.js";

export async function handleConfig() {
  const action = await getConfigAction();

  if (action == null) {
    return;
  }

  if (action === ConfigOption.CreateConfig) {
    await createConfig();
    return;
  }
}
