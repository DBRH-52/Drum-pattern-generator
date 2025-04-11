import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import './App.css';

function App() {
  const [pattern, setPattern] = useState([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);

  const drumSounds = ['Kick', 'Snare', 'Hi-Hat', 'Tom', 'Crush'];

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleGridCell = (row, col) => {
    const newPattern = [...pattern];
    newPattern[row][col] = !newPattern[row][col];
    setPattern(newPattern);
  };

  return (
    <div className="App">
      <h1>Drum Pattern Generator</h1>
      <div className="drum-grid">
        {/* beat umbers */}
        <div className="beat-numbers">
          <div className="drum-label"></div>
          {[1, 2, 3, 4].map((beat, index) => (
            <div key={index} className="beat-number">
              {beat}
            </div>
          ))}
        </div>
        
        {pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="drum-row">
            <div className="drum-label">{drumSounds[rowIndex]}</div>
            {row.map((isActive, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`drum-cell ${isActive ? 'active' : ''}`}
                onClick={() => toggleGridCell(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="controls">
        <button className="play-button">
          Play
        </button>
      </div>
    </div>
  );
}

export default App;
  