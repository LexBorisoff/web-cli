import emptyLine from "./emptyLine";
import printTitle from "./printTitle";
import { Severity, BannerType } from "../../types/utility.types";

export default function printBanner(
  message: string,
  titleType: BannerType,
  severity: Severity = "info"
) {
  emptyLine();
  printTitle(message, titleType, severity);
  emptyLine();
}
