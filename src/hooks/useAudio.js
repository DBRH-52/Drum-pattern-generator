import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { createSampler, playDrumSound } from '../audio/sampler';

export const useAudio = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const samplerRef = useRef(null);

  // initialize the sampler
  useEffect(() => {
    samplerRef.current = createSampler();
    
    return () => {
      if (samplerRef.current) {
        samplerRef.current.dispose();
      }
    };
  }, []);

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

  return {
    samplerRef,
    isInitialized,
    initializeAudio,
    playSound: handlePlaySound
  };
};
