import * as Tone from 'tone';

export const initializeAudio = async () => {
  await Tone.start();
  return true;
};

export const createSampler = () => {
  return new Tone.Sampler({
    // Map MIDI notes with .wav files
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
    // Route the output of the sampler directly to the audio destination
  }).toDestination();
};
