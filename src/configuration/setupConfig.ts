import * as fs from "fs";
import * as path from "path";

export default function setupConfig() {
  console.log("setting up config...");
  // const configExampleFile = path.normalize(
  //   `${__dirname}/../config.example.json`
  // );
  // const configFile = path.normalize(`${__dirname}/../config.json`);

  console.log(path.normalize(`${__dirname}/../config.example.json`));
  console.log(path.resolve(`${__dirname}/../config.example.json`));

  // fs.copyFile(configExampleFile, configFile, (err) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log(fs.readFileSync(configFile, "utf8"));
  //   }
  // });
}
