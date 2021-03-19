export function toDate(dateStr: string = ''): Date {
  if (!dateStr) {
    return new Date();
  }
  // формат даты 13.01.2021
  if (dateStr.includes('.')) {
    const parts: any = dateStr.split('.', 3);
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  // формат даты 2021-01-13
  const parts: any = dateStr.split('-', 3);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}
