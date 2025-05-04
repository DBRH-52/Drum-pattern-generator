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
export const generateLinearPattern = (beats = 4, measures = 1) => {
  const totalSteps = beats * measures; // one step per beat
  const drumWeights = [0.35, 0.35, 0.25, 0.03, 0.02]; // kick, snare, hihat, crash, tom

  // create empty pattern: each drum has an array of steps initialized to false
  const newPattern = Array.from({ length: drumWeights.length }, () => Array(totalSteps).fill(false));

  for (let step = 0; step < totalSteps; step++) {
    // for each beat (step), place exactly one hit
    let r = Math.random();
    let selectedDrum = 0;
    for (let i = 0; i < drumWeights.length; i++) {
      if (r < drumWeights[i]) {
        selectedDrum = i;
        break;
      }
      r -= drumWeights[i];
    }

    // set only the selected drum to true at this step
    newPattern.forEach((row, idx) => {
      row[step] = idx === selectedDrum;
    });
  }

  // ensure the first beat starts with kick or snare
  if (!newPattern[0][0] && !newPattern[1][0]) {
    newPattern[Math.random() < 0.7 ? 0 : 1][0] = true;
  }

  return newPattern;
};
