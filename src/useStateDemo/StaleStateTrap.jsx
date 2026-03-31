import { useState } from "react";

// ============================================================
// Section C: The Stale State Trap
// ============================================================
// Why you sometimes need the updater function form: setCount(prev => prev + 1)
// The "direct" way sees a STALE snapshot of state.
// The "updater" way always reads the LATEST pending value.
// Open the browser console to follow along!

export default function StaleStateTrap() {
  const [count, setCount] = useState(0);

  console.log("STALE STATE: rendering with count =", count);

  function addThreeDirect() {
    // These all see the SAME snapshot of count (e.g., 0)
    // So this is like saying: setCount(0+1), setCount(0+1), setCount(0+1)
    // Result: count goes to 1, not 3!
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log("STALE STATE: called setCount(count+1) three times. count was", count);
  }

  function addThreeUpdater() {
    // The updater function always receives the LATEST pending value
    // prev starts at current, then each call builds on the last
    setCount(prev => prev + 1); // prev=0 → 1
    setCount(prev => prev + 1); // prev=1 → 2
    setCount(prev => prev + 1); // prev=2 → 3
    console.log("STALE STATE: called setCount(prev => prev+1) three times");
  }

  return (
    <div className="demo-subsection">
      <h3>C. The Stale State Trap</h3>
      <p className="demo-note">
        Click each button and compare. The first only adds 1 (stale closure). The second adds 3 (updater function).
      </p>
      <p>Count: <strong>{count}</strong></p>
      <button className="btn btn-danger" onClick={addThreeDirect} style={{ marginRight: 8 }}>
        Add 3 (direct — broken)
      </button>
      <button className="btn btn-primary" onClick={addThreeUpdater}>
        Add 3 (updater — correct)
      </button>
      <br />
      <button className="btn btn-secondary" onClick={() => setCount(0)} style={{ marginTop: 8 }}>
        Reset
      </button>
    </div>
  );
}
