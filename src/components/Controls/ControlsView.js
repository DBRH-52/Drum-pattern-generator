import React from 'react';

import { timeSignatures } from '../../patterns/timeSignatures';
import { patternPresets } from '../../patterns/patternPresets';
import { MIN_TEMPO, MAX_TEMPO, MIN_MEASURES, MAX_MEASURES } from '../../utils/constants';

const ControlsView = ({
    tempo,
    isPlaying,
    currentTimeSignature,
    measureCount,
    onTempoChange,
    onTimeSignatureChange,
    onMeasureChange,
    onPlayStop,
    onReset,
    onPresetSelect,
    onLinearPattern,
    onRandomPattern,
}) => {
  return (
    <div className="controls">

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

      {/* Time signature and measure controls */}
      <div className="controls-group">

        {/* Time signature dropdown */}
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
        
        {/* Measure count controls */}
        <div className="measure-control">
          <label>Measures</label>
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
          <label htmlFor="tempo-slider">Tempo: {tempo} BPM</label>
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

      <div className="divider"></div>

      {/* Pattern presets & randomizer */}
      <div className="controls-group">
        <div className="preset-control">
          <label htmlFor="preset-select">Pattern Presets</label>
          <div className="preset-buttons">
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

            {/* Random pattern button */}
            <button 
              className="random-button" 
              onClick={onRandomPattern} 
              disabled={isPlaying}
            >
              Random Pattern
            </button>
          </div>
        </div>

        {/* Linear pattern button */}
        <button 
          className="linear-button" 
          onClick={onLinearPattern}
          disabled={isPlaying}
        >
          Linear
        </button>
      </div>
    </div>
  );
};

export default ControlsView;
