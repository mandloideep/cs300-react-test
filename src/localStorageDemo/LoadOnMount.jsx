// ============================================================
// Section B: Load on Mount
// ============================================================

import { useState, useEffect } from "react";

export default function LoadOnMount() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("demo-count-b");
    console.log("📂 LOCALSTORAGE: initial load — found:", saved);
    return saved !== null ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("demo-count-b", JSON.stringify(count));
    console.log("💾 LOCALSTORAGE: saved count =", count);
  }, [count]);

  return (
    <div className="demo-subsection">
      <h3>B. Load on Mount</h3>
      <p>
        Count: <strong>{count}</strong>
      </p>
      <button
        className="btn btn-primary"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Increment
      </button>{" "}
      <button className="btn btn-secondary" onClick={() => setCount(0)}>
        Reset
      </button>
      <div className="demo-note">
        The <strong>lazy initializer</strong> in useState runs once on mount and
        reads from localStorage. Now the value survives when you switch tabs and
        come back!
      </div>
    </div>
  );
}
