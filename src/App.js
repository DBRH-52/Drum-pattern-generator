import React from 'react';
import './styles/main.css';

import DrumGrid from './components/DrumGrid/DrumGrid';
import Controls from './components/Controls/Controls';
import SoundControls from './components/SoundControls/SoundControls';

import { useAudio } from './hooks/useAudio';
import { useDrumPattern } from './hooks/useDrumPattern';
import { useSequencer } from './hooks/useSequencer';

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
    handleRandomPattern,
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
        onRandomPattern={handleRandomPattern}
        onPresetSelect={handlePresetSelect}
        onLinearPattern={handleLinearPattern}
      />

      <SoundControls
        currentKit={currentKit}
        onKitChange={changeKit}
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
  