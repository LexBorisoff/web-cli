import { getConfigAction, ConfigAction } from "./get-config-action.js";
import { createConfigProject } from "./create-config-project/create-config-project.js";
import { showConfigProjectDir } from "./show-project-dir/show-project-dir.js";

export async function handleConfig() {
  const action = await getConfigAction();

  if (action == null) {
    return;
  }

  if (action === ConfigAction.CreateProject) {
    await createConfigProject();
    return;
  }

  if (action === ConfigAction.ShowProjectDir) {
    showConfigProjectDir();
    return;
  }
}
