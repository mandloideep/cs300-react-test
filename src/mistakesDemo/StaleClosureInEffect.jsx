// ============================================================
// Section B: Stale Closure in useEffect
// ============================================================

import { useState, useEffect, useRef } from "react";

export default function StaleClosureInEffect() {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState("broken");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (mode === "broken") {
      intervalRef.current = setInterval(() => {
        console.log(
          "🔴 MISTAKES: broken interval sees count =",
          count,
          "(always 0!)",
        );
      }, 2000);
    } else {
      intervalRef.current = setInterval(() => {
        setCount((prev) => {
          console.log(
            "🔴 MISTAKES: ✅ fixed interval uses updater, prev =",
            prev,
          );
          return prev;
        });
      }, 2000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mode]);

  return (
    <div className="demo-subsection">
      <h3>B. Stale Closure in useEffect</h3>

      <p>
        Count: <strong>{count}</strong>
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          className="btn btn-primary"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Increment
        </button>
        <button
          className={`btn ${mode === "broken" ? "btn-danger" : "btn-secondary"}`}
          onClick={() => setMode("broken")}
        >
          Broken Mode
        </button>
        <button
          className={`btn ${mode === "fixed" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setMode("fixed")}
        >
          Fixed Mode
        </button>
      </div>

      <p>
        {mode === "broken"
          ? "Check the console — the interval always logs count = 0, even after incrementing."
          : "Now the interval uses the updater function and sees the real current value."}
      </p>

      <div className="demo-note">
        The "broken" interval captures <code>count</code> from its closure —
        frozen at whatever value it was when the effect ran. The fix: use the{" "}
        <code>prev =&gt;</code> updater function which always gets the latest
        value from React.
      </div>
    </div>
  );
}
