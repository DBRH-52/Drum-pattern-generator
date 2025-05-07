import * as Tone from 'tone';

export const DRUM_KITS = {
  default: {
    name: 'Default Kit',
    sounds: {
      kick:   { note: 'C2', file: 'sounds/sounds_default/kick.wav' },
      snare:  { note: 'D2', file: 'sounds/sounds_default/snare.wav' },
      hihat:  { note: 'E2', file: 'sounds/sounds_default/hihat.wav' },
      crash:  { note: 'F2', file: 'sounds/sounds_default/crash.wav' },
      tom1:   { note: 'G2', file: 'sounds/sounds_default/tom1.wav' },
    }
  },
  electronic: {
    name: 'Electronic Kit',
    sounds: {
      kick:   { note: 'C2', file: 'electronic-kick.wav' },
      snare:  { note: 'D2', file: 'electronic-snare.wav' },
      hihat:  { note: 'E2', file: 'electronic-hihat.wav' },
      crash:  { note: 'F2', file: 'electronic-crash.wav' },
      tom1:   { note: 'G2', file: 'electronic-tom.wav' },
    }
  },
  // ...more kits
}; 