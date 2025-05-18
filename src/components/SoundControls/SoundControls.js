import React from 'react';
import SoundControlsView from './SoundControlsView';
import { DRUM_KITS } from '../../audio/drumKits';

const SoundControls = ({ 
  currentKit, 
  onKitChange
}) => {
  return (
    <SoundControlsView 
      currentKit={currentKit} 
      onKitChange={onKitChange} 
      kits={DRUM_KITS}
    />
  );
};

export default SoundControls; 