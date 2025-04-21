import React from 'react';
import { generateBeatNumbers } from '../utils/helpers';

const BeatNumbers = ({ currentTimeSignature, measureCount }) => {
  const beatNumbers = generateBeatNumbers(currentTimeSignature.beats, measureCount);

  return (
    <div className="beat-numbers">
      <div className="drum-label"></div>
      {beatNumbers.map((beat, index) => (
        <div 
          key={index} 
          className={`beat-number ${beat.isFirstBeat ? 'measure-start' : ''}`}
        >
          {beat.value}
        </div>
      ))}
    </div>
  );
};

export default BeatNumbers;