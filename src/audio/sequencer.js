import * as Tone from 'tone';

// create a new sequence
export const createSequence = (pattern, sampler, onStep, tempo) => {
  const totalSteps = pattern[0].length;
  const steps = Array.from({ length: totalSteps }, (_, i) => i);
  
  return new Tone.Sequence(
    (time, step) => {
      onStep(step);
      
      pattern.forEach((row, rowIndex) => {
        if (row[step]) {
          const notes = ['C2', 'D2', 'E2', 'F2', 'G2'];
          sampler.triggerAttackRelease(notes[rowIndex], '8n', time);
        }
      });
    },
    steps,
    '8n'
  );
};

// start the sequence
export const startSequence = (sequence) => {
  sequence.start(0);
  Tone.Transport.start();
};

// stop the sequence
export const stopSequence = (sequence) => {
  sequence.stop();
  Tone.Transport.stop();
};

// set the tempo
export const setTempo = (tempo) => {
  Tone.Transport.bpm.value = tempo;
};
