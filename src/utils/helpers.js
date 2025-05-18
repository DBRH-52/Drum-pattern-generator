// Generate beat number objects for a grid display spanning multiple measures
export const generateBeatNumbers = (beats, measureCount) => {
  const numbers = [];
  for (let measure = 0; measure < measureCount; measure++) {
    for (let beat = 0; beat < beats; beat++) {
      numbers.push({
        value: beat + 1, // Beat number (1-indexed)
        measure: measure + 1, // Measure number (1-indexed)
        isFirstBeat: beat === 0 // true if this is the first beat in the measure
      });
    }
  }
  return numbers;
};

// Play a single drum sound from the sampler
// sampler - Tone.js sampler object with mapped drum notes
// soundIndex - index corresponding to a drum type
export const playDrumSound = async (sampler, soundIndex) => {
  if (!sampler) return;
  
  const notes = ['C2', 'D2', 'E2', 'F2', 'G2'];
  const note = notes[soundIndex];
  
  sampler.triggerAttackRelease(note, '8n');
};