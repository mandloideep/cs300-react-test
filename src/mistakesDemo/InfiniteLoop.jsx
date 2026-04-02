// ============================================================
// Section D: Infinite Loop
// ============================================================

import { useState, useEffect, useRef } from "react";

export default function InfiniteLoop() {
  const [renderCount, setRenderCount] = useState(0);
  const [running, setRunning] = useState(false);
  const countRef = useRef(0);

  useEffect(() => {
    if (!running) return;

    countRef.current += 1;
    setRenderCount(countRef.current);

    if (countRef.current >= 20) {
      console.log(
        "🔴 MISTAKES: ⛔ stopped at 20 renders to prevent browser crash",
      );
      setRunning(false);
      return;
    }

    console.log("🔴 MISTAKES: infinite loop — render #" + countRef.current);
  }, [running, renderCount]);

  function startLoop() {
    countRef.current = 0;
    setRenderCount(0);
    setRunning(true);
    console.log("🔴 MISTAKES: starting infinite loop demo (capped at 20)");
  }

  return (
    <div className="demo-subsection">
      <h3>D. Infinite Loop</h3>

      <p>
        Render count: <strong>{renderCount}</strong>
      </p>

      <button className="btn btn-danger" onClick={startLoop} disabled={running}>
        {running ? "Running..." : "Start Loop (Safe Demo)"}
      </button>

      <div className="demo-note">
        This happens when an effect updates a value that's in its own dependency
        array: effect runs → state updates → triggers re-render → effect runs
        again → forever. This demo caps at 20 so your browser doesn't crash. In
        real code, restructure the logic to avoid this cycle.
      </div>

      <div className="demo-practical">
        <h3>How to avoid these mistakes</h3>
        <ul>
          <li>
            <strong>Mutation:</strong> Always spread — never push/mutate
            directly
          </li>
          <li>
            <strong>Stale closure:</strong> Use the <code>prev =&gt;</code>{" "}
            updater function
          </li>
          <li>
            <strong>Missing deps:</strong> If it's used in the effect, put it in
            the array
          </li>
          <li>
            <strong>Infinite loop:</strong> Don't setState on a value that's in
            your deps
          </li>
          <li>Use the React DevTools to inspect state and re-renders</li>
        </ul>
      </div>
    </div>
  );
}
