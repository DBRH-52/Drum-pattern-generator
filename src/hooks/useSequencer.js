import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { createSequence, startSequence, stopSequence, setTempo } from '../audio/sequencer';

export const useSequencer = (pattern, samplerRef, tempo) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const sequencerRef = useRef(null);

  // update tempo whenever it changes
  useEffect(() => {
    setTempo(tempo);
  }, [tempo]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (sequencerRef.current) {
        sequencerRef.current.dispose();
      }
    };
  }, []);

  // handle play/stop
  const handlePlayStop = async (initializeAudio) => {
    if (!isPlaying) {
      await initializeAudio();
      setIsPlaying(true);
      
      sequencerRef.current = createSequence(
        pattern,
        samplerRef.current,
        setCurrentStep,
        tempo
      );
      
      startSequence(sequencerRef.current);
    } else {
      stopSequence(sequencerRef.current);
      setIsPlaying(false);
      setCurrentStep(0);
    }
  };

  // stop sequence
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
