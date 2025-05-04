import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { createSampler, playDrumSound } from '../audio/sampler';
import { DRUM_KITS } from '../audio/drumKits';

export const useAudio = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentKit, setCurrentKit] = useState('default');
  const samplerRef = useRef(null);

  // initialize the sampler
  useEffect(() => {
    samplerRef.current = createSampler(currentKit);
    
    return () => {
      if (samplerRef.current) {
        samplerRef.current.sampler.dispose();
      }
    };
  }, [currentKit]);

  // initialize audio context
  const initializeAudio = async () => {
    if (!isInitialized) {
      await Tone.start();
      setIsInitialized(true);
    }
    return true;
  };

  // play a drum sound
  const handlePlaySound = async (soundIndex) => {
    await initializeAudio();
    playDrumSound(samplerRef.current, soundIndex);
  };

  // change drum kit
  const handleKitChange = (kitName) => {
    if (DRUM_KITS[kitName]) {
      setCurrentKit(kitName);
    }
  };

  return {
    samplerRef,
    isInitialized,
    currentKit,
    initializeAudio,
    playSound: handlePlaySound,
    changeKit: handleKitChange
  };
};
