import { useState, useRef } from "react";

// ============================================================
// Sections A & B: Imperative vs Declarative (Side by Side)
// ============================================================
// These two components do the SAME thing — increment a counter
// and change its color when it goes above 5.
// The difference is HOW they do it:
//   A (Imperative): manually tells the DOM what to change
//   B (Declarative): describes what the UI should look like
// Open the browser console to follow along!

// --- Section A: The Imperative (Vanilla JS) Way ---
function ImperativeWay() {
  // Using refs to get raw DOM elements — this is how jQuery/vanilla JS works
  const countRef = useRef(null);
  let count = 0;

  function handleClick() {
    count += 1;
    // We manually tell the DOM EXACTLY what to change:
    countRef.current.textContent = count;
    countRef.current.style.color = count > 5 ? "red" : "black";
    countRef.current.style.fontWeight = "bold";
    console.log("IMPERATIVE: I manually set textContent to", count, "and color to", count > 5 ? "red" : "black");
    // This is imperative: step 1, step 2, step 3...
    // YOU are responsible for every single DOM change.
  }

  return (
    <div className="demo-subsection">
      <h3>A. The Imperative Way (Vanilla JS Thinking)</h3>
      <p className="demo-note">
        This works, but YOU have to manually update every part of the DOM.
        Imagine doing this for 100 elements on a page!
      </p>
      <p>Count: <span ref={countRef}>0</span></p>
      <button className="btn btn-secondary" onClick={handleClick}>
        Increment (imperative)
      </button>
      {/* Problems with this approach:
          - You must track every DOM element manually
          - Easy to forget to update something
          - Hard to keep UI and data in sync
          - Gets unmanageable with complex UIs */}
    </div>
  );
}

// --- Section B: The Declarative (React) Way ---
function DeclarativeWay() {
  const [count, setCount] = useState(0);

  // React calls this entire function on every state change.
  // We just DESCRIBE what the UI should look like:
  console.log("DECLARATIVE: describing UI for count =", count);

  return (
    <div className="demo-subsection">
      <h3>B. The Declarative Way (React Thinking)</h3>
      <p className="demo-note">
        Same result, but we never touch the DOM directly.
        We describe WHAT the UI should be. React figures out HOW to update it.
      </p>
      {/* Notice: we don't say "change the color to red."
          We say: "the color IS red when count > 5."
          React handles the actual DOM changes. */}
      <p>
        Count:{" "}
        <span style={{ color: count > 5 ? "red" : "black", fontWeight: "bold" }}>
          {count}
        </span>
      </p>
      <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)}>
        Increment (declarative)
      </button>
    </div>
  );
}

// Combined: shown side by side
export default function ImperativeVsDeclarative() {
  return (
    <div className="side-by-side">
      <ImperativeWay />
      <DeclarativeWay />
    </div>
  );
}
