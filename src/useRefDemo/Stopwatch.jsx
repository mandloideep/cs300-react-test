import { useState, useRef, useEffect } from "react";

// ============================================================
// Section D: Stopwatch (timer ID in a ref)
// ============================================================
// Timer IDs should be stored in refs because:
// - They need to persist across renders (so we can clear them later)
// - Changing them should NOT cause a re-render
// Open the browser console to follow along!

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  function start() {
    if (timerRef.current !== null) return; // Already running
    console.log("STOPWATCH: starting interval");
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    // We store the interval ID in a ref, not state,
    // because changing it shouldn't re-render the component.
  }

  function stop() {
    console.log("STOPWATCH: stopping interval, timer ID was", timerRef.current);
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
  }

  function reset() {
    stop();
    setSeconds(0);
    console.log("STOPWATCH: reset to 0");
  }

  // Cleanup on unmount — if user switches tabs while stopwatch is running
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        console.log("STOPWATCH: cleanup — clearing interval on unmount");
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="demo-subsection">
      <h3>D. Stopwatch (timer ID in a ref)</h3>
      <p className="demo-note">
        The interval ID is stored in a ref, not state. We need it to persist (to
        clear later) but changing it shouldn't re-render.
      </p>
      <p style={{ fontSize: 32, fontWeight: "bold", fontFamily: "monospace" }}>
        {seconds}s
      </p>
      <button
        className="btn btn-primary"
        onClick={start}
        disabled={isRunning}
        style={{ marginRight: 8 }}
      >
        Start
      </button>
      <button
        className="btn btn-danger"
        onClick={stop}
        disabled={!isRunning}
        style={{ marginRight: 8 }}
      >
        Stop
      </button>
      <button className="btn btn-secondary" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
