import React from 'react';
import DrumRowView from './DrumRowView';

import { DRUM_SOUNDS } from '../../utils/constants';

const DrumRow = ({ 
  rowIndex, 
  row, 
  currentStep, 
  isPlaying, 
  currentTimeSignature, 
  onToggleStep,
  onPlaySound
}) => {
  return (
    <DrumRowView
      rowIndex={rowIndex}
      row={row}
      currentStep={currentStep}
      isPlaying={isPlaying}
      currentTimeSignature={currentTimeSignature}
      onToggleStep={onToggleStep}
      onPlaySound={onPlaySound}
      drumLabel={DRUM_SOUNDS[rowIndex]}
    />
  );
};

export default DrumRow;