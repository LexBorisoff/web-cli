export default function getTitle(choice: string): string {
  return `${choice[0].toUpperCase()}${choice.substring(1).toLowerCase()}`;
}
