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
  
  // for each beat in the pattern
  for (let beat = 0; beat < totalSteps; beat++) {
    // 70% chance of having a hit in this beat
    if (Math.random() < 0.7) {
      // randomly select which subdivision to place the hit (0-3)
      const subdivision = Math.floor(Math.random() * 4);
      
      // weights for different drums (kick, snare, hi-hat, crash, tom)
      const drumWeights = [0.3, 0.3, 0.25, 0.05, 0.1];
      let random = Math.random();
      let selectedDrum = 0;
      
      // select drum based on weights
      for (let i = 0; i < drumWeights.length; i++) {
        if (random < drumWeights[i]) {
          selectedDrum = i;
          break;
        }
        random -= drumWeights[i];
      }
      // place the hit - only one drum at this exact step
      newPattern[selectedDrum][beat] = true;
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
