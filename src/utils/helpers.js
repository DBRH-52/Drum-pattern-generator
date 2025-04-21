// generate beat numbers for multiple measures
export const generateBeatNumbers = (beats, measureCount) => {
  const numbers = [];
  for (let measure = 0; measure < measureCount; measure++) {
    for (let beat = 0; beat < beats; beat++) {
      numbers.push({
        value: beat + 1,
        measure: measure + 1,
        isFirstBeat: beat === 0
      });
    }
  }
  return numbers;
};

// play a single drum sound
export const playDrumSound = async (sampler, soundIndex) => {
  if (!sampler) return;
  
  const notes = ['C2', 'D2', 'E2', 'F2', 'G2'];
  const note = notes[soundIndex];
  
  sampler.triggerAttackRelease(note, '8n');
};