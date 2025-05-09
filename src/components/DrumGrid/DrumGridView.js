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
}) => {
  // Calculate the number of beats per measure FOR SPACING
  const beatsPerMeasure = currentTimeSignature?.beats || 4;
  
  // Array of properly spaced measure labels 
  const renderMeasureLabels = () => {
    const labels = [];
    
    // Add empty drum label for spacing
    labels.push(
      <div key="empty-label" className="drum-label"></div>
    );
    
    // For each measure -> create a label spanning the correct number of beats
    for (let i = 0; i < measureCount; i++) {
      // Each measure label spans multiple beat cells
      labels.push(
        <div 
          key={`measure-${i}`} 
          className="measure-label"
          style={{ 
            width: `${(beatsPerMeasure * 50) + ((beatsPerMeasure - 1) * 10)}px`,
            marginRight: i === measureCount - 1 ? '0' : '0',
          }}
        >
          Measure {i + 1}
        </div>
      );
    }
    
    return labels;
  };
  
  return (
    <div className="drum-grid">
      {/* Render measure indicators */}
      <div className="measure-indicators">
        {renderMeasureLabels()}
      </div>

      {/* Beat number row */}
      <BeatNumbers 
        currentTimeSignature={currentTimeSignature}
        measureCount={measureCount}
      />

      {/* Render a DrumRow for each instrument in the pattern */}
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
