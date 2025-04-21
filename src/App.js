import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import './App.css';

function App() {
  const timeSignatures = [
    { id: '4/4', beats: 4, name: '4/4' },
    { id: '3/4', beats: 3, name: '3/4' },
    { id: '2/4', beats: 2, name: '2/4' },
    { id: '5/4', beats: 5, name: '5/4' },
    { id: '6/8', beats: 6, name: '6/8' },
    { id: '7/8', beats: 7, name: '7/8' },
    { id: '9/8', beats: 9, name: '9/8' },
    { id: '12/8', beats: 12, name: '12/8' },
  ];

  const [currentTimeSignature, setCurrentTimeSignature] = useState(timeSignatures[0]);
  const [measureCount, setMeasureCount] = useState(1);

  // dynamic pattern based on time signature and measure count
  const createEmptyPattern = (beats, measures) => {
    return Array(5).fill().map(() => Array(beats * measures).fill(false));
  };

  const [pattern, setPattern] = useState(createEmptyPattern(currentTimeSignature.beats, measureCount));

  const patternPresets = {
    'basicRock': {
      name: 'Basic Rock Beat',
      timeSignature: '4/4',
      pattern: [
        [true, false, false, false, true, false, false, false], // Kick
        [false, false, true, false, false, false, true, false], // Snare
        [true, true, true, true, true, true, true, true],      // Hi-Hat
        [false, false, false, false, false, false, false, false], // Crash
        [false, false, false, false, false, false, false, false]  // Tom
      ]
    },
    'disco': {
      name: 'Disco Beat',
      timeSignature: '4/4',
      pattern: [
        [true, false, false, false, true, false, false, false], // Kick
        [false, false, true, false, false, false, true, false], // Snare
        [true, false, true, false, true, false, true, false],   // Hi-Hat
        [false, false, false, false, false, false, false, false], // Crash
        [false, false, false, false, false, false, false, false]  // Tom
      ]
    },
    'shuffle': {
      name: 'Shuffle Beat',
      timeSignature: '4/4',
      pattern: [
        [true, false, false, false, true, false, false, false], // Kick
        [false, false, true, false, false, false, true, false], // Snare
        [true, false, false, true, false, false, true, false],  // Hi-Hat
        [false, false, false, false, false, false, false, false], // Crash
        [false, false, false, false, false, false, false, false]  // Tom
      ]
    }
  };

  const loadPreset = (presetName) => {
    const preset = patternPresets[presetName];
    if (preset && preset.timeSignature === currentTimeSignature.id) {
      setPattern(preset.pattern);
    }
  };

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

  // handle time signature or measure count changes
  useEffect(() => {
    // stop any playing sequence
    if (isPlaying) {
      stopSequence();
    }
    
    // create a new pattern with the correct number of beats and measures
    setPattern(createEmptyPattern(currentTimeSignature.beats, measureCount));
    
    // reset current step
    setCurrentStep(0);
  }, [currentTimeSignature, measureCount]);

  const toggleStep = (row, col) => {
    const newPattern = [...pattern];
    newPattern[row][col] = !newPattern[row][col];
    setPattern(newPattern);
  };

  const handleTempoChange = (e) => {
    setTempo(Number(e.target.value));
  };

  const handleTimeSignatureChange = (e) => {
    const selectedSignature = timeSignatures.find(ts => ts.id === e.target.value);
    setCurrentTimeSignature(selectedSignature);
  };

  const handleAddMeasure = () => {
    setMeasureCount(prevCount => prevCount + 1);
  };

  const handleRemoveMeasure = () => {
    if (measureCount > 1) {
      setMeasureCount(prevCount => prevCount - 1);
    }
  };
  
  const handleResetPattern = () => {
    // reset the pattern to empty
    setPattern(createEmptyPattern(currentTimeSignature.beats, measureCount));
  };

  // initialize Tone.js audio context when needed
  const initializeAudio = async () => {
    await Tone.start();
    return true;
  };
  
  // play a single note sound when clicking on its label
  const playDrumSound = async (soundIndex) => {
    if (!samplerRef.current) return;
    
    await initializeAudio();
    
    // map sound index to corresponding note
    const notes = ['C2', 'D2', 'E2', 'F2', 'G2'];
    const note = notes[soundIndex];
    
    // play the sound
    samplerRef.current.triggerAttackRelease(note, '8n');
  };

  const playSequence = async () => {
    await initializeAudio();
    
    if (!isPlaying) {
      setIsPlaying(true);
      
      // set the tempo
      Tone.Transport.bpm.value = tempo;
      
      // create a sequence with the correct number of steps across all measures
      const totalSteps = currentTimeSignature.beats * measureCount;
      const steps = Array.from({ length: totalSteps }, (_, i) => i);
      
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
        steps,
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

  // generate beat numbers for multiple measures
  const generateBeatNumbers = () => {
    const numbers = [];
    for (let measure = 0; measure < measureCount; measure++) {
      for (let beat = 0; beat < currentTimeSignature.beats; beat++) {
        numbers.push({
          value: beat + 1,
          measure: measure + 1,
          isFirstBeat: beat === 0
        });
      }
    }
    return numbers;
  };

  return (
    <div className="App">
      <h1>Drum Pattern Generator</h1>
      
      <div className="controls">
        <div className="controls-group">
          <button className="play-button" onClick={playSequence}>
            {isPlaying ? 'Stop' : 'Play'}
          </button>
          
          <button 
            className="reset-button" 
            onClick={handleResetPattern} 
            disabled={isPlaying}
          >
            Reset
          </button>
        </div>
        
        <div className="divider"></div>
        
        <div className="controls-group">
          <div className="time-signature-control">
            <label htmlFor="time-signature-select">Time Signature</label>
            <select 
              id="time-signature-select"
              value={currentTimeSignature.id}
              onChange={handleTimeSignatureChange}
              className="time-signature-select"
              disabled={isPlaying}
            >
              {timeSignatures.map(ts => (
                <option key={ts.id} value={ts.id}>
                  {ts.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="measure-control">
            <label>Measures</label>
            <div className="measure-buttons">
              <button 
                onClick={handleRemoveMeasure} 
                disabled={measureCount <= 1 || isPlaying}
                className="measure-button"
              >
                -
              </button>
              <span className="measure-count">{measureCount}</span>
              <button 
                onClick={handleAddMeasure} 
                disabled={isPlaying || measureCount >= 4}
                className="measure-button"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        <div className="divider"></div>
        
        <div className="controls-group">
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

        <div className="divider"></div>

        <div className="controls-group">
          <div className="preset-control">
            <label htmlFor="preset-select">Pattern Presets</label>
            <select 
              id="preset-select"
              onChange={(e) => loadPreset(e.target.value)}
              className="preset-select"
              disabled={isPlaying}
            >
              <option value="">Select a preset...</option>
              {Object.entries(patternPresets).map(([key, preset]) => (
                <option key={key} value={key}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
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
        
        {/* beat numbers */}
        <div className="beat-numbers">
          <div className="drum-label"></div>
          {generateBeatNumbers().map((beat, index) => (
            <div 
              key={index} 
              className={`beat-number ${beat.isFirstBeat ? 'measure-start' : ''}`}
            >
              {beat.value}
            </div>
          ))}
        </div>
        
        {pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="drum-row">
            <div 
              className="drum-label clickable" 
              onClick={() => playDrumSound(rowIndex)}
              title={`Click to hear ${drumSounds[rowIndex]} sound`}
            >
              {drumSounds[rowIndex]}
            </div>
            {row.map((isActive, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`drum-cell ${isActive ? 'active' : ''} 
                  ${currentStep === colIndex && isPlaying ? 'current' : ''} 
                  ${colIndex % currentTimeSignature.beats === 0 ? 'measure-start' : ''}`}
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
  