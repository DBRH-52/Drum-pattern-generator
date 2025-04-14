import React, { useState, useEffect, useRef } from 'react';
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

  const drumSounds = ['Kick', 'Snare', 'Hi-Hat', 'Crash', 'Tom'];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const sequencerRef = useRef(null);
  const samplerRef = useRef(null);
  
  // initialize the sampler
  useEffect(() => {
    samplerRef.current = new Tone.Sampler({
      urls: {
        C2: "kick.wav",
        D2: "snare.wav",
        E2: "hihat.wav",
        F2: "crash.wav",
        G2: "tom1.wav",
      },
      onload: () => {
        console.log("Sampler loaded!");
      },
      baseUrl: "/sounds/"
    }).toDestination();
    
    return () => {
      if (sequencerRef.current) {
        sequencerRef.current.dispose();
      }
      if (samplerRef.current) {
        samplerRef.current.dispose();
      }
    };
  }, []);

  // update tempo whenever it changes
  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
  }, [tempo]);

  const toggleStep = (row, col) => {
    const newPattern = [...pattern];
    newPattern[row][col] = !newPattern[row][col];
    setPattern(newPattern);
  };

  const handleTempoChange = (e) => {
    setTempo(Number(e.target.value));
  };

  const playSequence = async () => {
    // request audio context to start
    await Tone.start();
    
    if (!isPlaying) {
      setIsPlaying(true);
      
      // set the tempo
      Tone.Transport.bpm.value = tempo;
      
      // create a sequence
      sequencerRef.current = new Tone.Sequence(
        (time, step) => {
          // update the current step
          setCurrentStep(step);
          
          // play the active sounds for this step
          pattern.forEach((row, rowIndex) => {
            if (row[step]) {
              // map row index to corresponding note
              const notes = ['C2', 'D2', 'E2', 'F2', 'G2'];
              samplerRef.current.triggerAttackRelease(notes[rowIndex], '8n', time);
            }
          });
        },
        [0, 1, 2, 3],
        '8n'
      );
      
      // start the sequence
      sequencerRef.current.start(0);
      Tone.Transport.start();
    } else {
      stopSequence();
    }
  };

  const stopSequence = () => {
    if (sequencerRef.current) {
      sequencerRef.current.stop();
      Tone.Transport.stop();
      setIsPlaying(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="App">
      <h1>Drum Pattern Generator</h1>
      
      <div className="controls">
        <button className="play-button" onClick={playSequence}>
          {isPlaying ? 'Stop' : 'Play'}
        </button>
        
        <div className="tempo-control">
          <label htmlFor="tempo-slider">Tempo: {tempo} BPM</label>
          <input 
            id="tempo-slider"
            type="range"
            min="60"
            max="200"
            step="1"
            value={tempo}
            onChange={handleTempoChange}
            className="tempo-slider"
          />
        </div>
      </div>
      
      <div className="drum-grid">
        {/* beat numbers */}
        <div className="beat-numbers">
          <div className="drum-label"></div>
          {[1, 2, 3, 4].map((beat, index) => (
            <div key={index} className="beat-number">
              {beat}
            </div>
          ))}
        </div>
        
        {/* pattern grid */}
        {pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="drum-row">
            <div className="drum-label">{drumSounds[rowIndex]}</div>
            {row.map((isActive, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`drum-cell ${isActive ? 'active' : ''} ${currentStep === colIndex && isPlaying ? 'current' : ''}`}
                onClick={() => toggleStep(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
  