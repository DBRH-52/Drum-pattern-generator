import React from 'react';
import ControlsView from './ControlsView';

const Controls = ({
  tempo,
  isPlaying,
  currentTimeSignature,
  measureCount,
  onTempoChange,
  onTimeSignatureChange,
  onMeasureChange,
  onPlayStop,
  onReset,
  onPresetSelect,
  onLinearPattern,
  onRandomPattern
}) => {
  return (
    <ControlsView
      tempo={tempo}
      isPlaying={isPlaying}
      currentTimeSignature={currentTimeSignature}
      measureCount={measureCount}
      onTempoChange={onTempoChange}
      onTimeSignatureChange={onTimeSignatureChange}
      onMeasureChange={onMeasureChange}
      onPlayStop={onPlayStop}
      onReset={onReset}
      onPresetSelect={onPresetSelect}
      onLinearPattern={onLinearPattern}
      onRandomPattern={onRandomPattern}
    />
  );
};

export default Controls;