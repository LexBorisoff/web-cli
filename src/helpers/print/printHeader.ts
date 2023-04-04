import emptyLine from "./emptyLine";
import printTitle from "./printTitle";
import { Severity } from "../../types/utility.types";

export default function printHeader(
  message: string,
  severity: Severity = "info"
) {
  emptyLine();
  printTitle(message, severity);
  emptyLine();
}
