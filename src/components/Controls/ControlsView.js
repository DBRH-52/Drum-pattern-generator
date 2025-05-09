import React from 'react';

import { timeSignatures } from '../../patterns/timeSignatures';
import { patternPresets } from '../../patterns/patternPresets';
import { MIN_TEMPO, MAX_TEMPO, MIN_MEASURES, MAX_MEASURES } from '../../utils/constants';
import { DRUM_KITS } from '../../audio/drumKits';

const ControlsView = ({
    tempo,
    isPlaying,
    currentTimeSignature,
    measureCount,
    currentKit,
    onTempoChange,
    onTimeSignatureChange,
    onMeasureChange,
    onPlayStop,
    onReset,
    onPresetSelect,
    onLinearPattern,
    onRandomPattern,
    onKitChange,
}) => {
  return (
    <div className="controls-container">
      {/* ROW 1: Drum Kit, Pattern Presets, Random Pattern and Linear Pattern */}
      <div className="controls controls-row">
        {/* Drum Kit selector */}
        <div className="controls-group">
          <div className="kit-selector">
            <label htmlFor="kit-select">Drum Kit</label>
            <select 
              id="kit-select"
              value={currentKit || 'default'}
              onChange={(e) => onKitChange(e.target.value)}
              disabled={isPlaying}
            >
              {Object.entries(DRUM_KITS || {}).map(([id, kit]) => (
                <option key={id} value={id}>
                  {kit.name || id}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="divider"></div>
        
        {/* Pattern presets dropdown */}
        <div className="controls-group">
          <div className="preset-control">
            <label htmlFor="preset-select">Pattern Presets</label>
            <select 
              id="preset-select"
              onChange={(e) => onPresetSelect(e.target.value)}
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
        
        <div className="divider"></div>
        
        {/* Pattern generators */}
        <div className="controls-group">
          {/* Random pattern button */}
          <button 
            className="random-button" 
            onClick={onRandomPattern} 
            disabled={isPlaying}
          >
            Random Pattern
          </button>
          
          {/* Linear pattern button */}
          <button 
            className="linear-button" 
            onClick={onLinearPattern}
            disabled={isPlaying}
          >
            Linear Pattern
          </button>
        </div>
      </div>
      
      {/* ROW 2: Play, Reset, Time Signature, Measures, Tempo */}
      <div className="controls controls-row">
        {/* Playback controls group */}
        <div className="controls-group">
          <button className="play-button" onClick={onPlayStop}>
            {isPlaying ? 'Stop' : 'Play'}
          </button>
          
          <button 
            className="reset-button" 
            onClick={onReset} 
            disabled={isPlaying}
          >
            Reset
          </button>
        </div>
        
        <div className="divider"></div>

        {/* Time signature control */}
        <div className="controls-group">
          <div className="time-signature-control">
            <label htmlFor="time-signature-select">Time Signature</label>
            <select 
              id="time-signature-select"
              value={currentTimeSignature.id}
              onChange={onTimeSignatureChange}
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
        </div>
        
        <div className="divider"></div>
        
        {/* Measure count controls */}
        <div className="controls-group">
          <div className="measure-control">
            <label className="measure-label">Measures</label>
            <div className="measure-buttons">
              <button 
                onClick={() => onMeasureChange(measureCount - 1)} 
                disabled={measureCount <= MIN_MEASURES || isPlaying}
                className="measure-button"
              >
                -
              </button>
              <span className="measure-count">{measureCount}</span>
              <button 
                onClick={() => onMeasureChange(measureCount + 1)} 
                disabled={isPlaying || measureCount >= MAX_MEASURES}
                className="measure-button"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        <div className="divider"></div>
        
        {/* Tempo control */}
        <div className="controls-group">
          <div className="tempo-control">
            <label htmlFor="tempo-slider"><span className="tempo-label">Tempo:</span> <span className="tempo-value">{tempo} BPM</span></label>
            <input 
              id="tempo-slider"
              type="range"
              min={MIN_TEMPO}
              max={MAX_TEMPO}
              step="1"
              value={tempo}
              onChange={onTempoChange}
              className="tempo-slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsView;
