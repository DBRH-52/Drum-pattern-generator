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

// generate a linear pattern with random hits
export const generateLinearPattern = (beats, measures) => {
  const newPattern = createEmptyPattern(beats, measures);
  const totalSteps = beats * measures;
  
  // linear pattern densities (one hit per subdivision)
  const densities = [
    [1, 0, 0, 0],  // 1 hit on the first subdivision
    [0, 1, 0, 0],  // 1 hit on the second subdivision
    [0, 0, 1, 0],  // 1 hit on the third subdivision
    [0, 0, 0, 1]   // 1 hit on the fourth subdivision
  ];
  
  for (let measure = 0; measure < measures; measure++) {
    for (let beat = 0; beat < beats; beat++) {
      const step = measure * beats + beat;
      // randomly select a drum for this step
      const selectedDrum = Math.floor(Math.random() * newPattern.length);
      // set only one drum per step
      newPattern.forEach((row, drumIdx) => {
        row[step] = drumIdx === selectedDrum;
      });
    }
  }
  
  // ensure the pattern starts with either kick or snare
  if (!newPattern[0][0] && !newPattern[1][0]) {
    if (Math.random() < 0.7) {
      newPattern[0][0] = true; // kick
    } else {
      newPattern[1][0] = true; // snare
    }
  }
  
  return newPattern;
};
