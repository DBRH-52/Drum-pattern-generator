import React from 'react';
import { DRUM_KITS } from '../audio/drumKits';

const SoundControls = ({ 
  currentKit, 
  onKitChange
}) => {
  return (
    <div className="sound-controls">
      <div className="kit-selector">
        <h3>Drum Kit</h3>
        <select 
          value={currentKit} 
          onChange={(e) => onKitChange(e.target.value)}
        >
          {Object.entries(DRUM_KITS).map(([id, kit]) => (
            <option key={id} value={id}>
              {kit.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SoundControls; 