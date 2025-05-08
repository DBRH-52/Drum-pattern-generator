import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { createSampler, playDrumSound } from '../audio/sampler';
import { DRUM_KITS } from '../audio/drumKits';

export const useAudio = () => {
  // Track whether the tone.js audio context has been initialized
  const [isInitialized, setIsInitialized] = useState(false);
  // Store the currently selected drum kid id
  const [currentKit, setCurrentKit] = useState('default');
  // Hold a ref to the sampler instance 
  const samplerRef = useRef(null);

  // Initialize the sampler, when currentKit changes
  useEffect(() => {
    // Instantiate sampler for the selected kit
    samplerRef.current = createSampler(currentKit);
    
    // Clean up the sampler on kit change or component unmount
    return () => {
      if (samplerRef.current) {
        // Dispose old samplers to free up resources
        samplerRef.current.sampler.dispose();
      }
    };
  }, [currentKit]);

  // Start Tone.js audio context if not already started
  const initializeAudio = async () => {
    if (!isInitialized) {
      await Tone.start(); // Required by browsers to enable audio interaction
      setIsInitialized(true);
    }
    return true;
  };

  // Trigger playback of a drum sound at a given index
  const handlePlaySound = async (soundIndex) => {
    await initializeAudio(); // Ensure audio context is started
    playDrumSound(samplerRef.current, soundIndex);
  };

  // Change the current drum kit (only if the ID exists in available kits)
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
