import { patternPresets } from './patternPresets.js';
import { generateLinearPattern, generateRandomPattern } from './patternGenerator.js';
import { timeSignatures } from './timeSignatures.js';

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
  
  // Find the correct time signature object to get the proper beats
  const timeSignatureObj = timeSignatures.find(ts => ts.id === timeSignature);
  const beats = timeSignatureObj ? timeSignatureObj.beats : 4; // Default to 4 if not found
  
  // Use actual beats from time signature instead of hardcoded values
  const newPattern = generateLinearPattern(beats, measureCount);
  
  setPattern(newPattern);
};

// Handle random pattern generation with the current time signature and measure count
export const handleRandomPattern = (isPlaying, timeSignature, measureCount, setPattern) => {
  if (isPlaying) return; // Don't change pattern while playing
  
  const stepsPerMeasure = timeSignature === '4/4' ? 8 : 6;
  const newPattern = generateRandomPattern(stepsPerMeasure, measureCount);
  
  setPattern(newPattern);
};