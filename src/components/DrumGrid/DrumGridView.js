import React from 'react';
import BeatNumbers from '../BeatNumbers/BeatNumbers';
import DrumRow from '../DrumRow/DrumRow';

const DrumGridView = ({
  pattern,
  currentTimeSignature,
  measureCount,
  currentStep,
  isPlaying,
  onToggleStep,
  onPlaySound,
  measureIndicators,
  BeatNumbersComponent,
  DrumRows
}) => {
  return (
    <div className="drum-grid">
      {/* measure indicators */}
      <div className="measure-indicators">
        <div className="drum-label"></div>
        {Array.from({ length: measureCount }).map((_, index) => (
          <div 
            key={index} 
            className="measure-label"
            style={{ 
              width: `${currentTimeSignature.beats * 50 + (currentTimeSignature.beats - 1) * 10}px`
            }}
          >
            Measure {index + 1}
          </div>
        ))}
      </div>

      <BeatNumbers 
        currentTimeSignature={currentTimeSignature}
        measureCount={measureCount}
      />

      {pattern.map((row, rowIndex) => (
        <DrumRow
          key={rowIndex}
          rowIndex={rowIndex}
          row={row}
          currentStep={currentStep}
          isPlaying={isPlaying}
          currentTimeSignature={currentTimeSignature}
          onToggleStep={onToggleStep}
          onPlaySound={onPlaySound}
        />
      ))}
    </div>
  );
};

export default DrumGridView;
