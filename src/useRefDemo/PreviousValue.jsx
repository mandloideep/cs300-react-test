import { useState, useRef, useEffect } from "react";

// ============================================================
// Section C: Storing a Previous Value
// ============================================================
// Refs persist across renders, so they're perfect for
// "remembering" the last value without causing extra re-renders.
// Open the browser console to follow along!

export default function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  // After each render, save the current count as the "previous" for next time
  useEffect(() => {
    console.log(
      "PREVIOUS VALUE: saving",
      count,
      "as previous (was",
      prevCountRef.current,
      ")",
    );
    prevCountRef.current = count;
  }, [count]);

  return (
    <div className="demo-subsection">
      <h3>C. Storing a Previous Value</h3>
      <p className="demo-note">
        The ref remembers the last value without causing extra re-renders.
      </p>
      <p>
        Current count: <strong>{count}</strong>
      </p>
      <p>
        Previous count: <strong>{prevCountRef.current}</strong>
      </p>
      <button
        className="btn btn-primary"
        onClick={() => setCount((prev) => prev + 1)}
        style={{ marginRight: 8 }}
      >
        Increment
      </button>
      <button className="btn btn-secondary" onClick={() => setCount(0)}>
        Reset
      </button>
      {/* How it works:
          1. count changes → re-render → screen shows new count and OLD prevCountRef
          2. After render, useEffect runs → saves count into prevCountRef
          3. Next render will show the updated prevCountRef */}
    </div>
  );
}
