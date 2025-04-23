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
import { generateLinearPattern } from './patterns/patternGenerator';

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

  const handleLinearPattern = () => {
    if (!isPlaying) {
      setPattern(generateLinearPattern(currentTimeSignature.beats, measureCount));
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
        onPresetSelect={handlePresetSelect}
        onLinearPattern={handleLinearPattern}
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
  