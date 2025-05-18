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
  // Volume control
  const [volume, setVolumeState] = useState(0); // 0dB is default (no change)

  // Force audio context to the correct state when component mounts
  useEffect(() => {
    const setupAudio = async () => {
      // Try to resume the audio context if it's suspended
      if (Tone.context.state !== 'running') {
        console.log('Attempting to resume audio context...');
        await Tone.context.resume();
        
        // After a small delay, check if we need to try other methods
        setTimeout(async () => {
          if (Tone.context.state !== 'running') {
            console.log('Still not running, trying Tone.start()...');
            try {
              await Tone.start();
              setIsInitialized(true);
              console.log('Audio context started successfully!');
            } catch (e) {
              console.error('Failed to start audio context:', e);
            }
          } else {
            setIsInitialized(true);
            console.log('Audio context resumed successfully!');
          }
        }, 500);
      } else {
        setIsInitialized(true);
        console.log('Audio context already running!');
      }
    };
    
    setupAudio();
  }, []);

  // Initialize the sampler, when currentKit changes
  useEffect(() => {
    // Instantiate sampler for the selected kit
    samplerRef.current = createSampler(currentKit);
    
    // Clean up the sampler on kit change or component unmount
    return () => {
      if (samplerRef.current && samplerRef.current.sampler && samplerRef.current.sampler.dispose) {
        // Dispose old samplers to free up resources
        try {
          samplerRef.current.sampler.dispose();
        } catch (e) {
          console.error("Error disposing sampler:", e);
        }
      }
    };
  }, [currentKit]);

  // Set the volume level
  const setVolume = (value) => {
    setVolumeState(value);
    Tone.Destination.volume.value = value; // Sets the master volume in decibels
  };

  // Start Tone.js audio context if not already started
  const initializeAudio = async () => {
    if (!isInitialized) {
      try {
        await Tone.start(); // Required by browsers to enable audio interaction
        await Tone.context.resume();
        setIsInitialized(true);
        console.log("Audio initialized successfully!");
      } catch (e) {
        console.error("Error initializing audio:", e);
      }
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
    changeKit: handleKitChange,
    setVolume,
    volume
  };
};
