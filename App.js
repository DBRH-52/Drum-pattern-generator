import React, { useState, useEffect } from "react";
import * as Tone from "tone";

function App() {
  // State to manage the grid pattern (5 drum parts, 16 steps)
  const [pattern, setPattern] = useState([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Tom1
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Kick
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Snare
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Hi-hat
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Crash
  ]);

  // State to manage playback status (whether the loop is playing or not)
  const [isPlaying, setIsPlaying] = useState(false);

  // Store the loop instance for stopping later
  const [loop, setLoop] = useState(null);

  useEffect(() => {
    // Preload sounds when the app starts
    const preloadSounds = async () => {
      // Unlock audio context after user interaction
      await Tone.start(); 
      console.log("Tone.js context started");
    };

    // Initialize the audio context when the component mounts
    preloadSounds(); 
  }, []);

  // Toggle a cell in a grid for editing the pattern
  const toggleCell = (rowIndex, colIndex) => {
    // Update the pattern by flipping the value of the clicked cell
    const updatedPattern = pattern.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? !cell : cell
      )
    );
    // Set the updated pattern in state
    setPattern(updatedPattern); 
  };

  // Function to start playback of the loop
  const startPlayback = async () => {
    await Tone.start(); // Ensure Tone.js is started
    console.log("Tone.js context started");

    // Create a sampler to load the sound files
    const sampler = new Tone.Sampler({
      urls: {
        A1: "/sounds/tom1.wav", // Tom
        C1: "/sounds/kick.wav", // Kick
        D1: "/sounds/snare.wav", // Snare
        E1: "/sounds/hihat.wav", // Hi-hat
        C2: "/sounds/crash.wav", // Crash
      },
    // Route the sampler output to the default audio output
    }).toDestination(); 

    // Wait for the sampler to be fully loaded
    await sampler.loaded; // Ensure all sounds are loaded
    console.log("Sounds loaded successfully!");

    // Loop function that will play notes based on the pattern
    const loopFunction = (time) => {
      pattern.forEach((row, rowIndex) => {
        // Map each row to a different note (tom, kick, snare, hi-hat, crash)
        const note = ["A1" ,"C1", "D1", "E1", "C2"][rowIndex]; 
        row.forEach((cell, colIndex) => {
          // If the cell is true (active), play the note at the corresponding time
          if (cell) {
            // Calculate when to play the note
            const noteTime = time + colIndex * (Tone.Time("8n").toSeconds()); 
            sampler.triggerAttackRelease(note, "8n", noteTime); 
            // Trigger the sound to play for an 8th note duration
            console.log(`Playing note: ${note} at time: ${noteTime}`);
          }
        });
      });
    };

    // Create a Tone.Loop to run the loopFunction every 1 bar (1 measure)
    const newLoop = new Tone.Loop(loopFunction, "1m");
    // Store the loop instance in state
    setLoop(newLoop); 

    // Start the loop immediately
    newLoop.start(0); 
    // Start the Tone.Transport to sync everything
    Tone.Transport.start(); 
    // Update state to indicate playback is active
    setIsPlaying(true); 
  };

  // Function to stop playback of the loop
  const stopPlayback = () => {
    if (loop) {
      // Stop the loop
      loop.stop(); 
      // Clean up the loop instance
      loop.dispose(); 
      // Reset the loop state
      setLoop(null); 
    }
    // Stop the transport (which controls timing)
    Tone.Transport.stop(); 
    // Update state to indicate playback is stopped
    setIsPlaying(false); 
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Custom Drum Machine</h1>

      {/* labels - left ; grid - right */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Labels - left */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "230px", marginRight: "10px" }}>
          {["Tom1", "Kick", "Snare", "Hi-hat", "Crash"].map((label, index) => (
            <div
              key={index}
              style={{
                width: "80px", 
                height: "40px", 
                margin: "2px",
                textAlign: "center",
                fontWeight: "bold",
                border: "1px solid black",
                padding: "5px",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        
        {/* Grid - right */}
        <div style={{ display: "inline-block", margin: "20px" }}>
          {pattern.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => toggleCell(rowIndex, colIndex)} 
                  style={{
                    width: "40px", 
                    height: "40px", 
                    margin: "2px",
                    backgroundColor: cell ? "green" : "lightgray", // Highlight active cells
                    border: "1px solid black",
                    cursor: "pointer",
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* play/stop button */}
      <button
        onClick={isPlaying ? stopPlayback : startPlayback} 
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: isPlaying ? "red" : "blue", 
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {isPlaying ? "Stop" : "Play"} {/* button text based on playback status */}
      </button>
    </div>
  );
}

export default App;
