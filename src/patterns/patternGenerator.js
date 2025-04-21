// empty pattern based on beats and measures
export const createEmptyPattern = (beats, measures) => {
  return Array(5).fill().map(() => Array(beats * measures).fill(false));
};

// toggle a step in the pattern
export const toggleStep = (pattern, row, col) => {
  const newPattern = [...pattern];
  newPattern[row][col] = !newPattern[row][col];
  return newPattern;
};

// reset the pattern to empty
export const resetPattern = (beats, measures) => {
  return createEmptyPattern(beats, measures);
};
