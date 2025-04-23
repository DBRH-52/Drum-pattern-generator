import { useState, useEffect } from 'react';
import { timeSignatures } from '../patterns/timeSignatures';
import { createEmptyPattern, toggleStep, resetPattern, generateRandomPattern } from '../patterns/patternGenerator';
import { DEFAULT_TEMPO, DEFAULT_MEASURE_COUNT } from '../utils/constants';

export const useDrumPattern = () => {
  const [currentTimeSignature, setCurrentTimeSignature] = useState(timeSignatures[0]);
  const [measureCount, setMeasureCount] = useState(DEFAULT_MEASURE_COUNT);
  const [pattern, setPattern] = useState(createEmptyPattern(currentTimeSignature.beats, measureCount));
  const [tempo, setTempo] = useState(DEFAULT_TEMPO);

  // handle time signature or measure count changes
  useEffect(() => {
    setPattern(createEmptyPattern(currentTimeSignature.beats, measureCount));
  }, [currentTimeSignature, measureCount]);

  // handle time signature change
  const handleTimeSignatureChange = (e) => {
    const selectedSignature = timeSignatures.find(ts => ts.id === e.target.value);
    setCurrentTimeSignature(selectedSignature);
  };

  // handle measure count change
  const handleMeasureChange = (newCount) => {
    setMeasureCount(newCount);
  };

  // handle pattern step toggle
  const handleToggleStep = (row, col) => {
    setPattern(toggleStep(pattern, row, col));
  };

  // handle tempo change
  const handleTempoChange = (e) => {
    setTempo(Number(e.target.value));
  };

  // handle pattern reset
  const handleReset = () => {
    setPattern(resetPattern(currentTimeSignature.beats, measureCount));
  };

  // handle random pattern generation
  const handleRandomPattern = () => {
    setPattern(generateRandomPattern(currentTimeSignature.beats, measureCount));
  };

  return {
    pattern,
    currentTimeSignature,
    measureCount,
    tempo,
    setPattern,
    handleTimeSignatureChange,
    handleMeasureChange,
    handleToggleStep,
    handleTempoChange,
    handleReset,
    handleRandomPattern
  };
};
