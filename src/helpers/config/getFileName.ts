import * as path from "path";

export function getConfigFileName(): string {
  return path.resolve(`${__dirname}/../../config.json`);
}

export function getEnginesFileName(): string {
  return path.resolve(`${__dirname}/../../engines.json`);
}
