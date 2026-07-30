export function yamlFiles(fileName: string): string[] {
  return [fileName, fileName.replace(/\.yml$/, '.yaml')];
}
