export default function urlParser(value: string): string {
  return value.trim().replaceAll(' ', '-').toLowerCase();
}
