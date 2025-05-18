import * as Tone from 'tone';
import { DRUM_NOTES } from '../utils/constants';
import { DRUM_KITS } from './drumKits';

// Return the sampler and the kit
export const createSampler = (kitName = 'default') => {
  // Select the requested kit or fallback to default
  const kit = DRUM_KITS[kitName];
  
  // Track if the sampler is loaded
  let loaded = true; // Always set to true since we're using synths now
  
  // Create synths for each drum sound instead of using samples
  const kick = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 4,
    oscillator: { type: 'sine' },
    envelope: { 
      attack: 0.001, 
      decay: 0.4, 
      sustain: 0.01, 
      release: 1.4,
      attackCurve: 'exponential'
    }
  }).toDestination();
  
  const snare = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { 
      attack: 0.001, 
      decay: 0.2, 
      sustain: 0, 
      release: 0.2 
    }
  }).toDestination();
  
  const hihat = new Tone.MetalSynth({
    frequency: 200,
    envelope: {
      attack: 0.001,
      decay: 0.1,
      release: 0.01
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
  }).toDestination();
  
  const crash = new Tone.MetalSynth({
    frequency: 300,
    envelope: {
      attack: 0.001,
      decay: 1,
      release: 3
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
  }).toDestination();
  
  const tom = new Tone.MembraneSynth({
    pitchDecay: 0.1,
    octaves: 2,
    oscillator: { type: 'sine' },
    envelope: { 
      attack: 0.001, 
      decay: 0.2, 
      sustain: 0.01, 
      release: 0.8
    }
  }).toDestination();
  
  // Create a custom object that emulates the Sampler interface
  const customSampler = {
    triggerAttackRelease: (note, duration, time) => {
      // Map the note to the appropriate synth
      switch(note) {
        case 'C2': 
          kick.triggerAttackRelease('C1', duration, time); 
          break;
        case 'D2': 
          snare.triggerAttackRelease(duration, time); 
          break;
        case 'E2': 
          hihat.triggerAttackRelease('C6', '32n', time); 
          break;
        case 'F2': 
          crash.triggerAttackRelease('C4', duration, time); 
          break;
        case 'G2': 
          tom.triggerAttackRelease('C3', duration, time); 
          break;
        default:
          console.warn('Unknown note:', note);
      }
    }
  };

  console.log("Using synth-based drum kit:", kitName);

  return {
    sampler: customSampler, // Return our custom synth-based sampler
    kit,
    isLoaded: () => true // Always allow playback attempts
  };
};

// Play a single drum sound based on its index
export const playDrumSound = (samplerState, soundIndex) => {
  if (!samplerState?.sampler) return;
  try {
    const note = DRUM_NOTES[soundIndex];
    // Trigger the note for 8n
    samplerState.sampler.triggerAttackRelease(note, '8n');
  } catch (e) {
    console.error("Error playing sound:", e);
  }
};
