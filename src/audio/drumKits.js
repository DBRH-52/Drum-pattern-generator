import * as Tone from 'tone';

export const DRUM_KITS = {
  default: {
    name: 'Default Kit',
    sounds: {
      kick: { note: 'C2', file: 'kick.wav' },
      snare: { note: 'D2', file: 'snare.wav' },
      hihat: { note: 'E2', file: 'hihat.wav' },
      crash: { note: 'F2', file: 'crash.wav' },
      tom1: { note: 'G2', file: 'tom1.wav' },
    }
  },
  electronic: {
    name: 'Electronic Kit',
    sounds: {
      kick: { note: 'C2', file: 'electronic-kick.wav' },
      snare: { note: 'D2', file: 'electronic-snare.wav' },
      hihat: { note: 'E2', file: 'electronic-hihat.wav' },
      crash: { note: 'F2', file: 'electronic-crash.wav' },
      tom1: { note: 'G2', file: 'electronic-tom.wav' },
    }
  },
  // ...more kits
}; 