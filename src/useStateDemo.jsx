import { useState } from "react";

// ============================================================
// useState Demo — Understanding React State
// ============================================================
// This file teaches WHY React state exists, HOW it works,
// and common pitfalls students encounter.
// Open the browser console to follow along!
// NOTE: In development, React StrictMode runs effects twice. This is normal!

// --- Section A: The Broken Counter ---
// This component uses a plain variable. Watch the console vs the screen.
function BrokenCounter() {
  let count = 0; // This resets to 0 every time React calls this function!

  function handleClick() {
    count = count + 1;
    // The variable DID change — check the console:
    console.log("BROKEN COUNTER: variable is now", count);
    // But React doesn't know about it. No re-render happens.
    // The screen stays frozen at 0.
  }

  return (
    <div className="demo-subsection">
      <h3>A. The Broken Counter (plain variable)</h3>
      <p className="demo-note">
        Click the button and watch the console vs the screen. The variable changes, but the UI does not!
      </p>
      <p>Count on screen: <strong>{count}</strong></p>
      <button className="btn btn-secondary" onClick={handleClick}>
        Increment (broken)
      </button>
      {/* WHY is it broken?
          React only re-renders when STATE changes.
          A plain variable changing is invisible to React.
          Even if the variable changes, React never re-calls this function. */}
    </div>
  );
}

// --- Section B: The Working Counter ---
// Same counter, but now using useState. React knows about changes!
function WorkingCounter() {
  // useState returns [currentValue, setterFunction]
  // React will re-call this entire function whenever setCount is called.
  const [count, setCount] = useState(0);

  // This log runs every time the component renders (function is called):
  console.log("WORKING COUNTER: rendering with count =", count);

  function handleClick() {
    // setCount tells React: "Hey, state changed! Re-render me."
    setCount(count + 1);
    console.log("WORKING COUNTER: called setCount. count is STILL", count, "(until next render)");
    // Notice: count doesn't change immediately! It's a snapshot of THIS render.
  }

  return (
    <div className="demo-subsection">
      <h3>B. The Working Counter (useState)</h3>
      <p className="demo-note">
        Now the UI updates! Check the console — notice the component re-renders each time.
      </p>
      <p>Count on screen: <strong>{count}</strong></p>
      <button className="btn btn-primary" onClick={handleClick}>
        Increment (works!)
      </button>
    </div>
  );
}

// --- Section C: The Stale State Trap ---
// Why you sometimes need the updater function form: setCount(prev => prev + 1)
function StaleStateTrap() {
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

// --- Section D: Multiple State Variables ---
// Each useState call is independent. Changing one doesn't affect the other.
function MultipleStates() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  console.log("MULTIPLE STATES: rendering with name =", JSON.stringify(name), "age =", age);

  return (
    <div className="demo-subsection">
      <h3>D. Multiple State Variables</h3>
      <p className="demo-note">
        Change one input. Watch the console — the component re-renders, but the OTHER state stays the same.
      </p>
      <div style={{ marginBottom: 8 }}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            console.log("MULTIPLE STATES: name changing to", JSON.stringify(e.target.value));
            setName(e.target.value);
          }}
          style={{ padding: "4px 8px", marginLeft: 8 }}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Age: </label>
        <button className="btn btn-secondary" onClick={() => {
          console.log("MULTIPLE STATES: age incrementing");
          setAge(prev => prev + 1);
        }}>
          {age} (click to increment)
        </button>
      </div>
      <p>Current values — name: "<strong>{name}</strong>", age: <strong>{age}</strong></p>
      {/* Each useState call tracks ONE piece of state.
          React remembers them by the ORDER they are called.
          This is why hooks must not be called inside conditions or loops. */}
    </div>
  );
}

// --- Main Demo Component ---
export default function UseStateDemo() {
  return (
    <div className="demo-section">
      <h2>useState — Making React Aware of Changes</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the scenes.
      </p>

      <BrokenCounter />
      <WorkingCounter />
      <StaleStateTrap />
      <MultipleStates />

      {/* Practical Use Cases */}
      <div className="demo-practical">
        <h3>When do you use useState in real apps?</h3>
        <ul>
          <li><strong>Form inputs</strong> — tracking what the user types (name, email, password)</li>
          <li><strong>Toggles</strong> — dark mode on/off, sidebar open/closed, modal visible/hidden</li>
          <li><strong>Counters</strong> — items in a shopping cart, notification badges, pagination</li>
          <li><strong>Loading/error states</strong> — showing a spinner while data loads, showing error messages</li>
          <li><strong>Selected items</strong> — which tab is active, which list item is highlighted</li>
          <li><strong>Any data that, when it changes, should update what the user sees</strong></li>
        </ul>
        <p className="demo-note">
          Rule of thumb: if the UI should change when a value changes, put it in state.
          If not (like a timer ID or a cache), use useRef instead.
        </p>
      </div>
    </div>
  );
}
