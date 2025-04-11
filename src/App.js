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
    </div>
  );
}

export default App;
  