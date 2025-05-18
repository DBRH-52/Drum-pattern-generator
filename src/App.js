import React, { useState, useEffect } from 'react';
import './styles/main.css';

import DrumGrid from './components/DrumGrid/DrumGrid.js';
import Controls from './components/Controls/Controls.js';

import { useAudio } from './hooks/useAudio.js';
import { useDrumPattern } from './hooks/useDrumPattern.js';
import { useSequencer } from './hooks/useSequencer.js';

import { handlePresetSelect, 
         handleLinearPattern, 
         handleRandomPattern 
       } from './patterns/patternController.js';

function App() {
  const [audioInitialized, setAudioInitialized] = useState(false);

  const {
    pattern,
    currentTimeSignature,
    measureCount,
    tempo,
    handleTimeSignatureChange,
    handleMeasureChange,
    handleToggleStep,
    handleTempoChange,
    handleReset,
    setPattern
  } = useDrumPattern();

  const {
    samplerRef,
    initializeAudio,
    playSound,
    currentKit,
    changeKit,
    setVolume,
    isInitialized
  } = useAudio();

  const {
    isPlaying,
    currentStep,
    handlePlayStop,
    stop
  } = useSequencer(pattern, samplerRef, tempo);

  // Update audioInitialized state when isInitialized changes
  useEffect(() => {
    if (isInitialized) {
      setAudioInitialized(true);
    }
  }, [isInitialized]);

  const handleAudioInit = async () => {
    await initializeAudio();
    // Make a test sound to ensure audio is working
    if (samplerRef.current) {
      playSound(0); // Play the kick drum to test audio
    }
    setAudioInitialized(true);
  };

  const handlePresetSelectClick = (presetName) => {
    handlePresetSelect(presetName, currentTimeSignature, setPattern);
  };
  const handleLinearPatternClick = () => {
    handleLinearPattern(isPlaying, currentTimeSignature, measureCount, setPattern);
  };
  const handleRandomPatternClick = () => {
    handleRandomPattern(isPlaying, currentTimeSignature, measureCount, setPattern);
  };

  return (
    <div className="App">
      <h1>Drum Pattern Generator</h1>
      
      {!audioInitialized && (
        <div className="audio-init-overlay">
          <button 
            className="audio-init-button"
            onClick={handleAudioInit}
          >
            Click to Enable Audio
          </button>
          <p>Audio must be enabled due to browser restrictions</p>
        </div>
      )}
      
      {/* Controls component, passing props related to tempo, time signature, measure count etc */}
      <Controls
        tempo={tempo}
        isPlaying={isPlaying}
        currentTimeSignature={currentTimeSignature}
        measureCount={measureCount}
        currentKit={currentKit}
        onTempoChange={handleTempoChange}
        onTimeSignatureChange={handleTimeSignatureChange}
        onMeasureChange={handleMeasureChange}
        onPlayStop={() => handlePlayStop(initializeAudio)}
        onReset={handleReset}
        onPresetSelect={handlePresetSelectClick}
        onLinearPattern={handleLinearPatternClick}
        onRandomPattern={handleRandomPatternClick}
        onKitChange={changeKit}
      />
      
      {/* DrumGrid component to display the pattern and allow interaction */}
      <DrumGrid
        pattern={pattern}
        currentTimeSignature={currentTimeSignature}
        measureCount={measureCount}
        currentStep={currentStep}
        isPlaying={isPlaying}
        onToggleStep={handleToggleStep}
        onPlaySound={playSound}
      />
    </div>
  );
}

export default App;
  