import * as Tone from 'tone';
import { DRUM_NOTES } from '../utils/constants';
import { DRUM_KITS } from './drumKits';

// create and configure the sampler
export const createSampler = (kitName = 'default') => {
  const kit = DRUM_KITS[kitName];
  
  // create the sampler with the selected kit
  const sampler = new Tone.Sampler({
    urls: Object.entries(kit.sounds).reduce((acc, [key, { note, file }]) => {
      acc[note] = file;
      return acc;
    }, {}),
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

// play a single drum sound
export const playDrumSound = (samplerState, soundIndex) => {
  if (!samplerState?.sampler) return;
  
  const note = DRUM_NOTES[soundIndex];
  samplerState.sampler.triggerAttackRelease(note, '8n');
};
