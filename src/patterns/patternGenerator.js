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

// generate a random pattern with musical constraints
export const generateRandomPattern = (beats, measures) => {
  const pattern = createEmptyPattern(beats, measures);
  const totalSteps = beats * measures;
  
  // Define probabilities for each drum type
  const probabilities = {
    0: 0.3,  // Kick drum - less frequent
    1: 0.25, // Snare drum - less frequent
    2: 0.6,  // Hi-hat - more frequent
    3: 0.1,  // Crash - very rare
    4: 0.15  // Tom - rare
  };
  
  // generate pattern with musical constraints
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < totalSteps; col++) {
      // skip first step for crash (row 3)
      if (row === 3 && col === 0) continue;
      // musical constraints
      if (row === 0) { // kick drum
        // higher probability on beats 1 and 3
        if (col % beats === 0 || col % beats === 2) {
          pattern[row][col] = Math.random() < 0.7;
        } else {
          pattern[row][col] = Math.random() < probabilities[row];
        }
      } else if (row === 1) { // snare drum
        // higher probability on beats 2 and 4
        if (col % beats === 1 || col % beats === 3) {
          pattern[row][col] = Math.random() < 0.7;
        } else {
          pattern[row][col] = Math.random() < probabilities[row];
        }
      } else {
        pattern[row][col] = Math.random() < probabilities[row];
      }
    }
  }
  
  return pattern;
};
