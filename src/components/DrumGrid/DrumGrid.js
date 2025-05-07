import React from 'react';
import DrumGridView from './DrumGridView';
import BeatNumbers from './BeatNumbers/BeatNumbers';
import DrumRow from './DrumRow';

const DrumGrid = ({
  pattern,
  currentTimeSignature,
  measureCount,
  currentStep,
  isPlaying,
  onToggleStep,
  onPlaySound
}) => {
  
  return (
    <DrumGridView
      pattern={pattern}
      currentTimeSignature={currentTimeSignature}
      measureCount={measureCount}
      currentStep={currentStep}
      isPlaying={isPlaying}
      onToggleStep={onToggleStep}
      onPlaySound={onPlaySound}
    />
  );
};

export default DrumGrid;