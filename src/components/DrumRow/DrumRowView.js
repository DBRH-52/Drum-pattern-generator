import React from 'react';
import { DRUM_SOUNDS } from '../../utils/constants';

const DrumRowView = ({
  rowIndex,
  row,
  currentStep,
  isPlaying,
  currentTimeSignature,
  onToggleStep,
  onPlaySound,
  drumLabel
}) => {
    return (
        <div className="drum-row">
          <div 
            className="drum-label clickable" 
            onClick={() => onPlaySound(rowIndex)}
            title={`Click to hear ${DRUM_SOUNDS[rowIndex]} sound`}
          >
            {DRUM_SOUNDS[rowIndex]}
          </div>
          {row.map((isActive, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`drum-cell ${isActive ? 'active' : ''} 
                ${currentStep === colIndex && isPlaying ? 'current' : ''} 
                ${colIndex % currentTimeSignature.beats === 0 ? 'measure-start' : ''}`}
              onClick={() => onToggleStep(rowIndex, colIndex)}
            />
          ))}
        </div>
      );
};

export default DrumRowView;
