import { useState, useEffect, useRef } from "react";

// ============================================================
// Section A: The Full Lifecycle Timeline
// ============================================================
// This component logs every phase of the React lifecycle:
//   1. Function body (render phase)
//   2. Mount effect
//   3. Update effect
//   4. Cleanup before next update
//   5. Unmount cleanup
// Open the browser console and watch the numbered logs!
// NOTE: In development, React StrictMode runs effects twice. This is normal!

export default function LifecycleTimeline() {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  // This runs in the FUNCTION BODY — during rendering
  console.log(
    `TIMELINE [render #${renderCountRef.current}]: 1️⃣ Function body runs (computing JSX). count = ${count}`,
  );

  // Mount effect — runs ONCE after the first render
  useEffect(() => {
    console.log(
      "TIMELINE: 2️⃣ MOUNT effect — component just appeared on screen",
    );
    console.log(
      "TIMELINE:    This is where you'd fetch initial data or set up subscriptions.",
    );

    return () => {
      console.log(
        "TIMELINE: 5️⃣ UNMOUNT cleanup — component is being removed from screen",
      );
      console.log(
        "TIMELINE:    This is where you'd cancel subscriptions or clear timers.",
      );
    };
  }, []);

  // Update effect — runs when count changes
  useEffect(() => {
    console.log(`TIMELINE: 3️⃣ UPDATE effect — count changed to ${count}`);
    console.log(
      "TIMELINE:    This is where you'd react to specific state changes.",
    );

    return () => {
      console.log(
        `TIMELINE: 4️⃣ CLEANUP before next update — cleaning up for count = ${count}`,
      );
      console.log(
        "TIMELINE:    The OLD effect cleans up before the NEW effect runs.",
      );
    };
  }, [count]);

  return (
    <div className="demo-subsection">
      <h3>A. The Full Lifecycle Timeline</h3>
      <p className="demo-note">
        Click the button and watch the console. The logs are numbered in the
        order they execute. Then switch to another tab to see the UNMOUNT log.
      </p>
      {console.log(
        `TIMELINE [render #${renderCountRef.current}]: 1b️⃣ Inside JSX return (still rendering)`,
      )}
      <p>
        Count: <strong>{count}</strong> (render #{renderCountRef.current})
      </p>
      <button
        className="btn btn-primary"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Increment (triggers re-render)
      </button>

      <div className="demo-note" style={{ marginTop: 12 }}>
        <strong>Execution order on first render (mount):</strong>
        <br />
        1️⃣ Function body runs → computes JSX
        <br />
        1b️⃣ JSX return executes (including inline console.logs)
        <br />
        2️⃣ React updates the DOM → browser paints
        <br />
        2️⃣ Mount effect runs (empty deps [])
        <br />
        3️⃣ Update effect runs ([count] changed from nothing to 0)
        <br />
        <br />
        <strong>On each subsequent click:</strong>
        <br />
        1️⃣ Function body runs again with new count
        <br />
        4️⃣ Old update effect cleans up
        <br />
        3️⃣ New update effect runs with new count
        <br />
        <br />
        <strong>When component unmounts (switch tabs):</strong>
        <br />
        4️⃣ Update effect cleanup runs
        <br />
        5️⃣ Mount effect cleanup runs
      </div>
    </div>
  );
}
