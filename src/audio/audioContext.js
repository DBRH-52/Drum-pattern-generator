import * as Tone from 'tone';

// initialize Tone.js audio context
export const initializeAudio = async () => {
  await Tone.start();
  return true;
};

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
