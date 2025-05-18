import React from 'react';
import ControlsView from './ControlsView';
import { timeSignatures } from '../../patterns/timeSignatures';
import { patternPresets } from '../../patterns/patternPresets';
import { MIN_TEMPO, MAX_TEMPO, MIN_MEASURES, MAX_MEASURES } from '../../utils/constants';

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