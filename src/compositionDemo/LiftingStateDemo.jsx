import { useState } from "react";

// ============================================================
// Section D: Lifting State Up
// ============================================================
// When two sibling components need to share data,
// move (lift) the state to their nearest common parent.
// The parent passes the state down as props and a callback to update it.
// Open the browser console to follow along!

// Two independent counters (each has its own state)
function IndependentCounter({ label }) {
  const [count, setCount] = useState(0);
  console.log("INDEPENDENT COUNTER:", label, "rendering with count =", count);
  return (
    <div className="card" style={{ display: "inline-block", marginRight: 12 }}>
      <strong>{label}:</strong> {count}
      <br />
      <button
        className="btn btn-primary"
        onClick={() => setCount((prev) => prev + 1)}
        style={{ marginTop: 4 }}
      >
        +1
      </button>
    </div>
  );
}

// A counter that receives its value and setter from the parent (lifted state)
function SharedCounter({ label, count, onIncrement }) {
  console.log("SHARED COUNTER:", label, "rendering with count =", count);
  return (
    <div className="card" style={{ display: "inline-block", marginRight: 12 }}>
      <strong>{label}:</strong> {count}
      <br />
      <button
        className="btn btn-primary"
        onClick={onIncrement}
        style={{ marginTop: 4 }}
      >
        +1
      </button>
    </div>
  );
}

// Temperature converter — classic lifting state example
function TemperatureConverter() {
  // The shared state lives in the PARENT
  const [celsius, setCelsius] = useState(0);

  // Derived values — computed from state, not stored separately
  const fahrenheit = (celsius * 9) / 5 + 32;

  console.log(
    "TEMPERATURE: celsius =",
    celsius,
    "fahrenheit =",
    fahrenheit.toFixed(1),
  );

  return (
    <div style={{ marginTop: 16 }}>
      <strong>Temperature Converter (shared state):</strong>
      <div style={{ marginTop: 8 }}>
        <label>
          Celsius:{" "}
          <input
            type="number"
            value={celsius}
            onChange={(e) => setCelsius(Number(e.target.value))}
            style={{ padding: "4px 8px", width: 80 }}
          />
        </label>
        <span style={{ margin: "0 12px" }}>=</span>
        <label>
          Fahrenheit:{" "}
          <input
            type="number"
            value={fahrenheit.toFixed(1)}
            onChange={(e) =>
              setCelsius(((Number(e.target.value) - 32) * 5) / 9)
            }
            style={{ padding: "4px 8px", width: 80 }}
          />
        </label>
      </div>
      <p className="demo-note">
        Both inputs share the same state (celsius). Changing either one updates
        the other. The parent owns the "source of truth."
      </p>
    </div>
  );
}

export default function LiftingStateDemo() {
  const [sharedCount, setSharedCount] = useState(0);

  console.log("LIFTING STATE: parent rendering, sharedCount =", sharedCount);

  return (
    <div className="demo-subsection">
      <h3>D. Lifting State Up</h3>

      <p className="demo-note">
        <strong>Before lifting:</strong> each counter has its own state (they
        don't sync).
      </p>
      <div style={{ marginBottom: 16 }}>
        <IndependentCounter label="Counter A" />
        <IndependentCounter label="Counter B" />
      </div>

      <p className="demo-note">
        <strong>After lifting:</strong> the parent owns the state and passes it
        down. Both counters show the same value!
      </p>
      <div style={{ marginBottom: 16 }}>
        <SharedCounter
          label="Counter A"
          count={sharedCount}
          onIncrement={() => setSharedCount((prev) => prev + 1)}
        />
        <SharedCounter
          label="Counter B"
          count={sharedCount}
          onIncrement={() => setSharedCount((prev) => prev + 1)}
        />
      </div>

      <TemperatureConverter />
    </div>
  );
}
