import * as Tone from 'tone';
import { DRUM_NOTES } from '../utils/constants';
import { DRUM_KITS } from './drumKits';

// Return the sampler and the kit
export const createSampler = (kitName = 'default') => {
  // Select the requested kit or fallback to default
  const kit = DRUM_KITS[kitName];
  
  // Construct a Tone.Sampler using the sound mappings from the selected kit
  const sampler = new Tone.Sampler({
    // Mapping createdd dynamically from the selected srum kits configuraton
    urls: Object.entries(kit.sounds).reduce((acc, [key, { note, file }]) => {
      // For each drum sound entry - map the midi note to the coreesponding .wav file
      acc[note] = file;
      // Continue building the mapping object - return the updated accumulator
      return acc;
    }, {}), // Init - empty object
    // Callback -- runs once all audio files are loaded and ready
    onload: () => {
      console.log("Sampler loaded!");
    },
    baseUrl: "/sounds/"
  }).toDestination();

  return {
    sampler,
    kit
  };
};

// Play a single drum sound based on its index
export const playDrumSound = (samplerState, soundIndex) => {
  if (!samplerState?.sampler) return;
  // Look up the corresponding note from the sound index
  const note = DRUM_NOTES[soundIndex];
  // Trigger the note for 8n
  samplerState.sampler.triggerAttackRelease(note, '8n');
};
