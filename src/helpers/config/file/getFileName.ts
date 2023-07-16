import * as path from "path";

export default function getFileName(): string {
  return path.resolve(`${__dirname}/../../../config.json`);
}
