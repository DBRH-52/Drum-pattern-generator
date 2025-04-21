import * as Tone from 'tone';
import { DRUM_NOTES } from '../utils/constants';

// create and configure the sampler
export const createSampler = () => {
  return new Tone.Sampler({
    urls: {
      C2: "kick.wav",
      D2: "snare.wav",
      E2: "hihat.wav",
      F2: "crash.wav",
      G2: "tom1.wav",
    },
    onload: () => {
      console.log("Sampler loaded!");
    },
    baseUrl: "/sounds/"
  }).toDestination();
};

// play a single drum sound
export const playDrumSound = (sampler, soundIndex) => {
  if (!sampler) return;
  sampler.triggerAttackRelease(DRUM_NOTES[soundIndex], '8n');
};
