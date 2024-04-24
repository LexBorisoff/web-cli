import { getConfigAction, ConfigAction } from "./get-config-action.js";
import { createConfigProject } from "./create-config-project/create-config-project.js";
import { showConfigMeta } from "./show-config-data/show-config-meta.js";

export async function handleConfig() {
  const action = await getConfigAction();

  if (action === ConfigAction.ShowProjectDir) {
    showConfigMeta.projectDir();
    return;
  }

  if (action === ConfigAction.ShowUpdatedAt) {
    showConfigMeta.updatedAt();
    return;
  }

  if (action === ConfigAction.ShowCreatedAt) {
    showConfigMeta.createdAt();
    return;
  }

  if (action === ConfigAction.CreateProject) {
    await createConfigProject();
    return;
  }
}
