// Create an empty pattern based on beats and measures
export const createEmptyPattern = (beats, measures) => {
  return Array(5).fill().map(() => Array(beats * measures).fill(false));
};

// Toggle the activation state of a specific step (on/off) in the pattern
export const toggleStep = (pattern, row, col) => {
  const newPattern = [...pattern]; // Shallow copy of pattern array
  newPattern[row][col] = !newPattern[row][col]; // Flip the bool value
  return newPattern;
};

// Reset the pattern to an all-false state
export const resetPattern = (beats, measures) => {
  return createEmptyPattern(beats, measures);
};

// Generate a random pattern
export const generateRandomPattern = (beats = 4, measures = 1) => {
  const totalSteps = beats * measures;
  const newPattern = Array(5).fill().map(() =>
    Array.from({ length: totalSteps }, () => Math.random() < 0.25) // 25% chance to activate each step
  );
  return newPattern;
};

// Generate a linear pattern (with random hits)
export const generateLinearPattern = (beats = 4, measures = 1) => {
  const totalSteps = beats * measures; // one step per beat
  // Weight distribution for drums
  const drumWeights = [0.35, 0.35, 0.25, 0.03, 0.02]; // kick, snare, hihat, crash, tom

  // Create an empty pattern -- each drum has an array of steps initialized to false
  const newPattern = Array.from({ length: drumWeights.length }, () => Array(totalSteps).fill(false));

  for (let step = 0; step < totalSteps; step++) {
    // For each beat (step), randomly choose one drum to activate using weighted probabilities
    let randomThreshold = Math.random(); // Random value between 0 and 1
    let selectedDrum = 0;
    // Loop through weights to find the drum whose range contains randomThreshold
    for (let i = 0; i < drumWeights.length; i++) {
      if (randomThreshold < drumWeights[i]) {
        selectedDrum = i;
        break;
      }
      randomThreshold -= drumWeights[i];
    }

    // Set only the selected drum to true at the current step
    newPattern.forEach((row, idx) => {
      row[step] = idx === selectedDrum;
    });
  }

  // Ensure the first beat starts with kick (row 0) or snare (row 1)
  if (!newPattern[0][0] && !newPattern[1][0]) {
    // 70% chance to choose kick, 30% chance to choose snare
    newPattern[Math.random() < 0.7 ? 0 : 1][0] = true;
  }

  return newPattern;
};
