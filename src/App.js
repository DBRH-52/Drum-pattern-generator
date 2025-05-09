import React from 'react';
import './styles/main.css';

import DrumGrid from './components/DrumGrid/DrumGrid.js';
import Controls from './components/Controls/Controls.js';
import SoundControls from './components/SoundControls/SoundControls.js';

import { useAudio } from './hooks/useAudio.js';
import { useDrumPattern } from './hooks/useDrumPattern.js';
import { useSequencer } from './hooks/useSequencer.js';

import { handlePresetSelect, 
         handleLinearPattern, 
         handleRandomPattern 
       } from './patterns/patternController.js';

function App() {
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
    setEffect
  } = useAudio();

  const {
    isPlaying,
    currentStep,
    handlePlayStop,
    stop
  } = useSequencer(pattern, samplerRef, tempo);

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
      
      {/* Controls component, passing props related to tempo, time signature, measure count etc */}
      <Controls
        tempo={tempo}
        isPlaying={isPlaying}
        currentTimeSignature={currentTimeSignature}
        measureCount={measureCount}
        onTempoChange={handleTempoChange}
        onTimeSignatureChange={handleTimeSignatureChange}
        onMeasureChange={handleMeasureChange}
        onPlayStop={() => handlePlayStop(initializeAudio)}
        onReset={handleReset}
        onPresetSelect={handlePresetSelectClick}
        onLinearPattern={handleLinearPatternClick}
        onRandomPattern={handleRandomPatternClick}
      />

      {/* Sound controls component for changing the drum kit */}
      <SoundControls
        currentKit={currentKit}
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
  