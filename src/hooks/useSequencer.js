import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { createSequence, startSequence, stopSequence, setTempo } from '../audio/sequencer';

export const useSequencer = (pattern, samplerRef, tempo) => {
  // State - whether playback is currently running
  const [isPlaying, setIsPlaying] = useState(false);
  // State - which step (col) is currently active
  const [currentStep, setCurrentStep] = useState(0);
  // Ref to the current sequence (control playback)
  const sequencerRef = useRef(null);

  // Update Tone.js tempo - when the user changes the tempo slider
  useEffect(() => {
    setTempo(tempo);
  }, [tempo]);

  // Dispose the sequencer when this hook/component unmounts
  useEffect(() => {
    return () => {
      if (sequencerRef.current) {
        sequencerRef.current.dispose();
      }
    };
  }, []);

  // Handle play/stop button click
  const handlePlayStop = async (initializeAudio) => {
    if (!isPlaying) {
      // Ensure Tone.js is started before playing (required by browser)
      await initializeAudio();
      setIsPlaying(true);
      
      // Create the sequencer for the current pattern and tempo
      sequencerRef.current = createSequence(
        pattern,
        samplerRef.current,
        setCurrentStep,
        tempo
      );
      startSequence(sequencerRef.current);
    } 
    else {
      stopSequence(sequencerRef.current);
      setIsPlaying(false);
      setCurrentStep(0);
    }
  };

  const stop = () => {
    if (sequencerRef.current) {
      stopSequence(sequencerRef.current);
      setIsPlaying(false);
      setCurrentStep(0);
    }
  };

  return {
    isPlaying,
    currentStep,
    handlePlayStop,
    stop
  };
};
