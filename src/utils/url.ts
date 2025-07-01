export function parsePermalink(permalink: string): string {
  return permalink.replace('/r/', 'r/');
}
