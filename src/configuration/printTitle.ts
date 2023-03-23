const print = console.log;

export default function printTitle(title: string): void {
  const columnsLength = 2;
  let line = "";
  const lineLength = 70;
  for (let i = 0; i < lineLength; i++) {
    line += "=";
  }

  if (line.length - title.length - columnsLength <= 0) {
    print(line);
    print(title);
    print(line);
    return;
  }

  const spaces = line.length - title.length - columnsLength;
  const half = spaces % 2 === 0 ? spaces / 2 : spaces / 2 - 1;

  let spacesLeft = "";
  for (let i = 0; i < half; i++) {
    spacesLeft += " ";
  }

  let spacesRight = spacesLeft;
  if (spaces % 2 > 0) {
    spacesRight += " ";
  }

  const titleLine = `>${spacesLeft}${title}${spacesRight}<`;

  print(line);
  print(titleLine);
  print(line);
}
