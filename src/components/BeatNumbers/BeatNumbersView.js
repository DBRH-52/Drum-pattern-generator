import React from 'react';

const BeatNumbersView = ({ beatNumbers }) => {
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

export default BeatNumbersView;
