// ============================================================
// Section A: Mutation Bug
// ============================================================

import { useState } from "react";

export default function MutationBug() {
  const [colors, setColors] = useState(["red", "blue", "green"]);

  function brokenAdd() {
    colors.push("purple");
    setColors(colors);
    console.log(
      "🔴 MISTAKES: ❌ pushed to same array — React sees same reference, skips render",
    );
    console.log(
      "🔴 MISTAKES: array actually has",
      colors.length,
      "items but UI won't update",
    );
  }

  function correctAdd() {
    setColors((prev) => [...prev, "purple"]);
    console.log("🔴 MISTAKES: ✅ spread created new array — React re-renders");
  }

  function reset() {
    setColors(["red", "blue", "green"]);
  }

  return (
    <div className="demo-subsection">
      <h3>A. Mutation Bug</h3>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        {colors.map((color, i) => (
          <span
            key={i}
            style={{
              background: color,
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "16px",
              fontSize: "14px",
            }}
          >
            {color}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button className="btn btn-danger" onClick={brokenAdd}>
          Broken: push + set
        </button>
        <button className="btn btn-primary" onClick={correctAdd}>
          Correct: spread
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="demo-note">
        Click "Broken" multiple times, then click "Correct" once. You'll see all
        the pushed items suddenly appear — they were in the array the whole
        time, but React wasn't re-rendering because the reference never changed.
      </div>
    </div>
  );
}
