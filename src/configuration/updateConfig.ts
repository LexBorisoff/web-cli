import { getConfigArgs } from "../command";

export default function updateConfig() {
  const { args } = getConfigArgs();
  const { defaults, browsers, profiles } = args;

  if (defaults) {
    console.log("update Defaults");
  }

  if (browsers) {
    console.log("update Browsers");
  }

  if (profiles) {
    console.log("update Profiles");
  }
}
