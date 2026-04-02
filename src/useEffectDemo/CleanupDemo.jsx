import { useState, useEffect } from "react";

// ============================================================
// Section C: Cleanup Functions
// ============================================================
// When a useEffect returns a function, that function runs:
//   1. When the component unmounts
//   2. Before the effect re-runs (if deps changed)
// This is how you prevent memory leaks from timers, subscriptions, etc.
// Open the browser console to follow along!
// NOTE: In development, React StrictMode runs effects twice. This is normal!

// A sub-component that runs a setInterval and cleans it up
function TickingClock() {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    console.log("C. CLEANUP: ⏱️ starting interval (clock mounted)");

    const id = setInterval(() => {
      setTicks((prev) => prev + 1);
      console.log("C. CLEANUP: ⏱️ tick");
    }, 1000);

    // This cleanup function runs:
    // 1. When the component unmounts
    // 2. Before the effect re-runs (if deps changed)
    return () => {
      console.log("C. CLEANUP: 🛑 clearing interval (clock unmounting)");
      clearInterval(id);
    };
  }, []); // Empty deps = mount once, cleanup on unmount

  return (
    <p>
      Clock has ticked <strong>{ticks}</strong> times
    </p>
  );
}

export default function CleanupDemo() {
  const [showClock, setShowClock] = useState(false);

  return (
    <div className="demo-subsection">
      <h3>C. Cleanup Functions</h3>
      <p className="demo-note">
        Toggle the clock on/off. Watch the console — "starting interval" on
        mount, "clearing interval" on unmount. Cleanup prevents memory leaks!
      </p>
      <button
        className="btn btn-primary"
        onClick={() => {
          console.log("C. CLEANUP: toggling clock", showClock ? "OFF" : "ON");
          setShowClock((prev) => !prev);
        }}
      >
        {showClock ? "Hide Clock (unmount)" : "Show Clock (mount)"}
      </button>
      {showClock && <TickingClock />}
      {/* When showClock becomes false, React unmounts TickingClock.
          The cleanup function inside its useEffect runs, clearing the interval.
          Without cleanup, the interval would keep running forever! */}
    </div>
  );
}
