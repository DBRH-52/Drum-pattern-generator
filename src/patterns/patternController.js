import { patternPresets } from './patternPresets.js';

// Handle preset selection and load the corresponding pattern if it matches the current time signature
export const handlePresetSelect = (presetName, timeSignature, setPattern) => {
  const preset = patternPresets[presetName];
  // Only update the pattern if the time signature matches the current one
  if (preset && preset.timeSignature === timeSignature) {
    setPattern(preset.pattern); // Update pattern to preset's pattern
  }
};

// Generate a linear pattern with the current time signature and measure count
export const handleLinearPattern = (isPlaying, timeSignature, measureCount, setPattern) => {
  if (isPlaying) return; // Don't change pattern while playing
  
  const stepsPerMeasure = timeSignature === '4/4' ? 8 : 6;
  const totalSteps = stepsPerMeasure * measureCount;
  
  const newPattern = Array(5).fill().map((_, drumIndex) => {
    return Array(totalSteps).fill().map((_, stepIndex) => {
      // Create a simple linear pattern that progresses through each drum
      return stepIndex % 5 === drumIndex;
    });
  });
  
  setPattern(newPattern);
};

// Handle random pattern generation with the current time signature and measure count
export const handleRandomPattern = (isPlaying, timeSignature, measureCount, setPattern) => {
  if (isPlaying) return; // Don't change pattern while playing
  
  const stepsPerMeasure = timeSignature === '4/4' ? 8 : 6;
  const totalSteps = stepsPerMeasure * measureCount;
  
  const newPattern = Array(5).fill().map(() => {
    return Array(totalSteps).fill().map(() => {
      // 30% chance for each step to be active
      return Math.random() < 0.3;
    });
  });
  
  setPattern(newPattern);
};