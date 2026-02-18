export const search = <T extends { username: string }>(
  data: T[],
  searchQuery: string
): T[] => {
  return data.filter((element) =>
    element.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
};