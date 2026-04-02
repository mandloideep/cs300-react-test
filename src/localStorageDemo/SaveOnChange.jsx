// ============================================================
// Section A: Save on Change
// ============================================================

import { useState, useEffect } from "react";

export default function SaveOnChange() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("demo-count", JSON.stringify(count));
    console.log("💾 LOCALSTORAGE: saved count =", count);
  }, [count]);

  return (
    <div className="demo-subsection">
      <h3>A. Save on Change</h3>
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
        Every time <code>count</code> changes, the useEffect writes it to
        localStorage. But we're not <em>reading</em> it back yet — switch tabs
        and come back to see the count reset to 0. We fix that in Section B.
      </div>
    </div>
  );
}
