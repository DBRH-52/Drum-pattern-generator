import React, { useState, useEffect } from "react";
import * as Tone from "tone";

function App() {
  // State to manage the grid pattern (5 drum parts, 16 steps)
  const [pattern, set_pattern] = useState([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Tom1
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Kick
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Snare
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Hi-hat
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Crash
  ]);
  
  // Tracking the current step
  const [current_step, set_current_step] = useState(0);

  // State to manage playback status (whether the loop is playing or not)
  const [is_playing, set_is_playing] = useState(false);

  // Store the loop instance for stopping later
  const [loop, set_loop] = useState(null);

  // Dark mode state (initialized from localStorage)
  const [dark_mode, set_dark_mode] = useState(
    localStorage.getItem("dark_mode") === "true"
  );

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("dark_mode", dark_mode);
  }, [dark_mode]);

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
  const toggle_grid_cell = (row_index, column_index) => {
    // Update the pattern by flipping the value of the clicked cell
    const updated_pattern = pattern.map((row, row_idx) =>
      row.map((cell, column_idx) =>
        row_idx === row_index && column_idx === column_index ? !cell : cell
      )
    );
    // Set the updated pattern in state
    set_pattern(updated_pattern); 
  };

  // Function to start playback of the loop
  const start_playback = async () => {
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
    const play_notes_pattern_loop = (time) => {
      set_current_step((previous_step) => (previous_step + 1) % 16);
      pattern.forEach((row, row_index) => {
        // Map each row to a different note (tom, kick, snare, hi-hat, crash)
        const note = ["A1" ,"C1", "D1", "E1", "C2"][row_index]; 
        row.forEach((cell, column_index) => {
          // If the cell is true (active), play the note at the corresponding time
          if (cell && column_index === current_step) {
            // Calculate when to play the note
            const note_time = time + column_index * (Tone.Time("8n").toSeconds()); 
            sampler.triggerAttackRelease(note, "8n", note_time); 
            // Trigger the sound to play for an 8th note duration
            console.log(`Playing note: ${note} at time: ${note_time}`);
          }
        });
      });
    };
  

    // Create a Tone.Loop to run the loopFunction every 1 bar (1 measure)
    const run_pattern_1_bar_loop = new Tone.Loop(play_notes_pattern_loop, "1m");
    // Store the loop instance in state
    set_loop(run_pattern_1_bar_loop); 

    // Start the loop immediately
    run_pattern_1_bar_loop.start(0); 
    // Start the Tone.Transport to sync everything
    Tone.Transport.start(); 
    // Update state to indicate playback is active
    set_is_playing(true); 
  };

  // Function to stop playback of the loop
  const stop_playback = () => {
    if (loop) {
      // Stop the loop
      loop.stop(); 
      // Clean up the loop instance
      loop.dispose(); 
      // Reset the loop state
      set_loop(null); 
    }
    // Stop the transport (which controls timing)
    Tone.Transport.stop(); 
    // Update state to indicate playback is stopped
    set_is_playing(false); 
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: dark_mode ? "#121212" : "#ffffff",
        color: dark_mode ? "#ffffff" : "#000000",
        minHeight: "100vh",
        transition: "background 0.3s ease",
      }}
    >
      <button
        onClick={() => set_dark_mode(!dark_mode)}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: dark_mode ? "#444" : "#ccc",
          color: dark_mode ? "#fff" : "#000",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Toggle Dark Mode
      </button>

      <h1>Custom Drum Machine</h1>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
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
                backgroundColor: dark_mode ? "#444" : "#ccc",
                color: dark_mode ? "#fff" : "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div style={{ display: "inline-block", margin: "20px" }}>
          {pattern.map((row, row_index) => (
            <div key={row_index} style={{ display: "flex" }}>
              {row.map((cell, column_index) => (
                <div
                  key={column_index}
                  onClick={() => toggle_grid_cell(row_index, column_index)}
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "2px",
                    backgroundColor: column_index === current_step ? "yellow" : cell ? "green" : "lightgray",
                    border: "1px solid black",
                    cursor: "pointer",
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={is_playing ? stop_playback : start_playback}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: is_playing ? "red" : "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {is_playing ? "Stop" : "Play"}
      </button>
    </div>
  );
}

export default App;
