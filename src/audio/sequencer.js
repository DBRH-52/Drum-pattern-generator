import * as Tone from 'tone';

// Create a new step sequencer
// pattern - 2D arr -> row = instruments, col = steps
// sampler - Tone.Sampler instance to play the drum sounds
// onStep - callback to notify which step is currently playing - for ui updates
// tempo - bpm
export const createSequence = (pattern, sampler, onStep, tempo) => {
  const totalSteps = pattern[0].length;
  const steps = Array.from({ length: totalSteps }, (_, i) => i);
  
  // Create a sequence that plays every 8n note
  return new Tone.Sequence(
    (time, step) => {
      // Visually update the current step
      onStep(step);
      // Iterate over each instrument line
      pattern.forEach((row, rowIndex) => {
        if (row[step]) { // If the step is active for the current instrument
          const notes = ['C2', 'D2', 'E2', 'F2', 'G2']; // Define the corresponding midi notes for each instrument
          // trigger ONLY if sampler exists and is loaded
          try {
            if (sampler?.sampler) {
              sampler.sampler.triggerAttackRelease(notes[rowIndex], '8n', time); // Play the note at the correct time
            }
          } catch (e) {
            console.error("Error playing note:", e);
          }
        }
      });
    },
    steps,
    '8n'
  );
};

export const startSequence = (sequence) => {
  sequence.start(0);
  Tone.Transport.start();
};

export const stopSequence = (sequence) => {
  sequence.stop();
  Tone.Transport.stop();
};

export const setTempo = (tempo) => {
  Tone.Transport.bpm.value = tempo;
};
