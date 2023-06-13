import { writeFile } from "../../helpers/config";
import { EnginesConfig } from "../../types/engine.types";

const initialEngines: EnginesConfig = {
  google: {
    name: "Google",
    url: "www.google.com",
    query: "search?q=",
    alias: ["g"],
  },
  mdn: {
    name: "MDN",
    url: "developer.mozilla.org/en-US",
    query: "search?q=",
  },
};

export default function setupInitialEngines() {
  writeFile({ engines: initialEngines });
}
