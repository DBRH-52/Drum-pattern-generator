import { generateLinearPattern, generateRandomPattern } from '../patterns/patternGenerator';
import { patternPresets } from '../patterns/patternPresets';

  // Handle preset selection and load the corresponding pattern if it matches the current time signature
  export const handlePresetSelect = (presetName, currentTimeSignature, setPattern) => {
    if (!presetName) return; // Early exit if no preset is selected
    
    const preset = patternPresets[presetName];
    // Only update the pattern if the time signature matches the current one
    if (preset && preset.timeSignature === currentTimeSignature.id) {
      setPattern(preset.pattern); // Update pattern to preset's pattern
    }
  };
  // Generate a linear pattern with the current time signature and measure count
  export const handleLinearPattern = (isPlaying, currentTimeSignature, measureCount, setPattern) => {
    if (!isPlaying) { // Ensure pattern is only generated when not playing
      setPattern(generateLinearPattern(currentTimeSignature.beats, measureCount));
    }
  };
  // Handle random pattern generation
  export const handleRandomPattern = (isPlaying, currentTimeSignature, measureCount, setPattern) => {
    if (!isPlaying) { // Ensure pattern is only generated when not playing
      setPattern(generateRandomPattern(currentTimeSignature.beats, measureCount)); // Generate random pattern
    }
  };