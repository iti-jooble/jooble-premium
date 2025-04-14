export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const getYearsArray = (
  startYear: number = 1969,
  endYear: number = 0,
): string[] => {
  if (!endYear) {
    endYear = getCurrentYear();
  }

  return Array.from({ length: endYear - startYear + 1 }, (_, i) =>
    (startYear + i).toString(),
  );
};
