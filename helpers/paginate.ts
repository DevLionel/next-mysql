export function paginate<T>(items: T[], currentPage: number, pageSize: number): T[] {
  if (!Array.isArray(items)) return [];
  const startIndex = (currentPage - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}