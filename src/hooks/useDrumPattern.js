import { useState, useEffect } from 'react';
import { timeSignatures } from '../patterns/timeSignatures';
import { createEmptyPattern, toggleStep, resetPattern, generateRandomPattern } from '../patterns/patternGenerator';
import { DEFAULT_TEMPO, DEFAULT_MEASURE_COUNT } from '../utils/constants';

export const useDrumPattern = () => {
  // Currently selected time signature
  const [currentTimeSignature, setCurrentTimeSignature] = useState(timeSignatures[0]); 
  // Number of measures in the pattern
  const [measureCount, setMeasureCount] = useState(DEFAULT_MEASURE_COUNT);
  // 2D arr representing the drum pattern
  const [pattern, setPattern] = useState(createEmptyPattern(currentTimeSignature.beats, measureCount));
  // Current tempo in bpm
  const [tempo, setTempo] = useState(DEFAULT_TEMPO);

  // When the time signature or measure count changes -> reset the pattern to match
  useEffect(() => {
    setPattern(createEmptyPattern(currentTimeSignature.beats, measureCount));
  }, [currentTimeSignature, measureCount]);

  // Handle time signature dropdown change
  const handleTimeSignatureChange = (e) => {
    const selectedSignature = timeSignatures.find(ts => ts.id === e.target.value);
    setCurrentTimeSignature(selectedSignature);
  };

  // Handle change of the number of measures
  const handleMeasureChange = (newCount) => {
    setMeasureCount(newCount);
  };

  // Toggle a specific step in the pattern (turn note on/off)
  const handleToggleStep = (row, col) => {
    setPattern(toggleStep(pattern, row, col));
  };

  // Handle tempo slider change
  const handleTempoChange = (e) => {
    setTempo(Number(e.target.value));
  };

  // Reset pattern to all off (no active steps)
  const handleReset = () => {
    setPattern(resetPattern(currentTimeSignature.beats, measureCount));
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
  };
};
