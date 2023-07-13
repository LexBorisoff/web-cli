import { writeFile } from "../../helpers/config";
import { EnginesConfig } from "../../types/engine.types";

const initialEngines: EnginesConfig = {
  google: {
    name: "Google",
    url: "www.google.com",
    query: "search?q=",
    alias: ["g"],
  },
};

export default function setupInitialEngines() {
  writeFile("engines", initialEngines);
}
