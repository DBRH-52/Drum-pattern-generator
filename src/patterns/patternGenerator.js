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

// Generate a random linear pattern (no simultaneous hits)
export const generateLinearPattern = (beats = 4, measures = 1) => {
  // Calculate total number of steps in the pattern
  const totalSteps = beats * measures;
  const drumNames = ['kick', 'snare', 'hihat', 'crash', 'tom'];
  const numDrums = drumNames.length;
  
  // Create empty pattern with all drums silent
  // 2D array (row - drum; column - step)
  //-> pattern[drumIndex][stepIndex] = true/false
  const newPattern = Array(numDrums).fill().map(() => Array(totalSteps).fill(false));
  
  // Calculate how many steps will have drum hits
  // 60-90% density to make it sound musical but not overwhelming
  const density = 0.6 + (Math.random() * 0.3);
  const numHits = Math.round(totalSteps * density);
  
  // Randomly elect which time positions will have drum hits (without duplicates)
  const stepsWithHits = [];
  while (stepsWithHits.length < numHits) {
    const step = Math.floor(Math.random() * totalSteps);
    // Avoid placing multiple hits on the same step
    if (!stepsWithHits.includes(step)) {
      stepsWithHits.push(step);
    }
  }
  
  // Sort the steps in chronological order to process them sequentially
  stepsWithHits.sort((a, b) => a - b);
  
  // Define probability weights for each drum
  // To make patterns sound more realistic by using drums in natural proportions
  // (kicks and snares are more common than crashes and toms in typical drumming)
  const drumProbs = {
    kick: 0.35,   // (most common)
    snare: 0.3,   // (next most common)
    hihat: 0.25,  // (moderately common)
    crash: 0.05,  // (rare)
    tom: 0.05     // (rare)
  };
  
  // Create a weighted selection array -- to pick drums based on their probabilities
  // use an array where more common drums appear more frequently
  const weightedDrums = [];
  for (let i = 0; i < numDrums; i++) {
    const drumName = drumNames[i];
    // Convert % to count
    const count = Math.round(drumProbs[drumName] * 100);
    // Add  drums index to the array multiple times based on its weight
    for (let j = 0; j < count; j++) {
      weightedDrums.push(i);
    }
  }

  // Special case for the first beat (most patterns start with kick or snare)
  if (stepsWithHits.includes(0)) {
    // 80% chance kick, 20% chance snare on first beat
    newPattern[Math.random() < 0.8 ? 0 : 1][0] = true;
    // Remove first beat from steps to process
    stepsWithHits.shift();
  }
  
  //Generate the sequence of drums for the remaining steps
  // Keep track of the previous drum to avoid repetitive patterns
  let prevDrum = -1;
  
  for (const step of stepsWithHits) {
    // Try to avoid selecting the same drum that just played (more interesting patterns)
    let selectedDrum;
    let attempts = 0;
    
    do {
      // Pick a random drum using weighted array to favor more common drums
      selectedDrum = weightedDrums[Math.floor(Math.random() * weightedDrums.length)];
      attempts++;
      
      // If can't find a different drum after several attempts -> accept the same drum rather than getting stuck in an infinite loop
      if (attempts > 5) break;
      
    } while (selectedDrum === prevDrum);
    
    // Activate the selected drum at this step
    newPattern[selectedDrum][step] = true;
    // Remember this drum to avoid immediate repetition in the next step
    prevDrum = selectedDrum;
  }
  
  return newPattern;
};
