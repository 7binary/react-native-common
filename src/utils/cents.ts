export function cents(number: number): string {
  return (Math.floor(number * 100) / 100).toFixed(2);
}
