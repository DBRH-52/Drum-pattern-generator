import React from 'react';

const SoundControlsView = ({ 
    currentKit, 
    onKitChange, 
    kits 
}) => {
  return (
    <div className="sound-controls">
      <div className="kit-selector">
        <h3>Drum Kit</h3>
        <select 
          value={currentKit} 
          onChange={(e) => onKitChange(e.target.value)}
        >
          {Object.entries(kits).map(([id, kit]) => (
            <option key={id} value={id}>
              {kit.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SoundControlsView;
