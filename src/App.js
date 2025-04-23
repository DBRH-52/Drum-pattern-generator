import React from 'react';
import './App.css';

// components
import DrumGrid from './components/DrumGrid';
import Controls from './components/Controls';

// hooks
import { useAudio } from './hooks/useAudio';
import { useDrumPattern } from './hooks/useDrumPattern';
import { useSequencer } from './hooks/useSequencer';

// patterns
import { patternPresets } from './patterns/patternPresets';

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
    handleRandomPattern,
    setPattern
  } = useDrumPattern();

  const {
    samplerRef,
    initializeAudio,
    playSound
  } = useAudio();

  const {
    isPlaying,
    currentStep,
    handlePlayStop,
    stop
  } = useSequencer(pattern, samplerRef, tempo);

  const handlePresetSelect = (presetName) => {
    if (!presetName) return;
    
    const preset = patternPresets[presetName];
    if (preset && preset.timeSignature === currentTimeSignature.id) {
      setPattern(preset.pattern);
    }
  };

  return (
    <div className="App">
      <h1>Drum Pattern Generator</h1>
      
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
        onRandomPattern={handleRandomPattern}
        onPresetSelect={handlePresetSelect}
      />
      
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
  