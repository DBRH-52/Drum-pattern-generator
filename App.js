import React, { useState, useEffect } from "react";
import * as Tone from "tone";

function App() {
  // State to manage the grid pattern (5 rows for 5 drum parts, 16 columns for 16 steps)
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
      await Tone.start(); // Unlock audio context after user interaction
      console.log("Tone.js context started");
    };

    preloadSounds(); // Initialize the audio context when the component mounts
  }, []);

  // Function to toggle a cell in the grid (for editing the pattern)
  const toggleCell = (rowIndex, colIndex) => {
    // Update the pattern by flipping the value of the clicked cell
    const updatedPattern = pattern.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? !cell : cell
      )
    );
    setPattern(updatedPattern); // Set the updated pattern in state
  };

  // Function to start playback of the loop
  const startPlayback = async () => {
    await Tone.start(); // Ensure Tone.js is started
    console.log("Tone.js context started");

    // Create a sampler to load the sound files
    const sampler = new Tone.Sampler({
      urls: {
        A1: "/sounds/tom1.wav", // Assign path for tom sound
        C1: "/sounds/kick.wav", // Assign path for kick sound
        D1: "/sounds/snare.wav", // Assign path for snare sound
        E1: "/sounds/hihat.wav", // Assign path for hi-hat sound
        C2: "/sounds/crash.wav", // Assign path for crash sound
      },
    }).toDestination(); // Route the sampler output to the default audio output

    // Wait for the sampler to be fully loaded
    await sampler.loaded; // Ensure all sounds are loaded
    console.log("Sounds loaded successfully!");

    // Define the loop function that will play notes based on the pattern
    const loopFunction = (time) => {
      pattern.forEach((row, rowIndex) => {
        const note = ["A1" ,"C1", "D1", "E1", "C2"][rowIndex]; // Map each row to a different note (kick, snare, hi-hat)
        row.forEach((cell, colIndex) => {
          if (cell) {
            // If the cell is true (active), play the note at the corresponding time
            const noteTime = time + colIndex * (Tone.Time("8n").toSeconds()); // Calculate when to play the note
            sampler.triggerAttackRelease(note, "8n", noteTime); // Trigger the sound to play for an 8th note duration
            console.log(`Playing note: ${note} at time: ${noteTime}`);
          }
        });
      });
    };

    // Create a Tone.Loop to run the loopFunction every 1 bar (1 measure)
    const newLoop = new Tone.Loop(loopFunction, "1m");
    setLoop(newLoop); // Store the loop instance in state

    newLoop.start(0); // Start the loop immediately
    Tone.Transport.start(); // Start the Tone.Transport to sync everything
    setIsPlaying(true); // Update state to indicate playback is active
  };

  // Function to stop playback of the loop
  const stopPlayback = () => {
    if (loop) {
      loop.stop(); // Stop the loop
      loop.dispose(); // Clean up the loop instance
      setLoop(null); // Reset the loop state
    }
    Tone.Transport.stop(); // Stop the transport (which controls timing)
    setIsPlaying(false); // Update state to indicate playback is stopped
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Custom Drum Machine</h1>

      {/* Layout for labels on the left side and grid to the right */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Labels on the left */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "230px", marginRight: "10px" }}>
          {["Tom1", "Kick", "Snare", "Hi-hat", "Crash"].map((label, index) => (
            <div
              key={index}
              style={{
                width: "80px", // Same width as the grid cells
                height: "40px", // Match the height of the grid cells
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
        
        {/* Render the pattern grid */}
        <div style={{ display: "inline-block", margin: "20px" }}>
          {pattern.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => toggleCell(rowIndex, colIndex)} // Toggle the cell's state on click
                  style={{
                    width: "40px", // Same width for grid cells
                    height: "40px", // Same height for grid cells
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

      {/* Render the play/stop button */}
      <button
        onClick={isPlaying ? stopPlayback : startPlayback} // Toggle playback when clicked
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: isPlaying ? "red" : "blue", // Change button color based on playback status
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {isPlaying ? "Stop" : "Play"} {/* Change button text based on playback status */}
      </button>
    </div>
  );
}

export default App;
