export function getExtension(filename: string | undefined | null): string | null {
  if (!filename) {
    return null;
  }

  const matches = /(?:\.([^.]+))?$/.exec(filename);

  return matches && matches[1] ? matches[1].toLowerCase() : null;
}
