import * as path from "path";

export default function getConfigFileName(): string {
  return path.resolve(`${__dirname}/../../config.json`);
}
