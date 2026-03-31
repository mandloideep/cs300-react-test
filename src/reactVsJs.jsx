import { useState, useRef } from "react";

// ============================================================
// React vs JavaScript — Understanding the React Mental Model
// ============================================================
// This file shows the fundamental difference between how
// vanilla JavaScript and React approach building UIs.
// Vanilla JS: IMPERATIVE — you tell the DOM exactly what to do, step by step.
// React: DECLARATIVE — you describe what the UI should look like, React figures out the rest.
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

// --- Section C: Traffic Light (State Drives UI) ---
function TrafficLight() {
  const [light, setLight] = useState("red");

  console.log("TRAFFIC LIGHT: state is", JSON.stringify(light), "→ React re-renders → UI updates automatically");

  // We never say "turn off the red, turn on the green."
  // We say "the light is green" and React updates everything.
  return (
    <div className="demo-subsection">
      <h3>C. State Drives UI — Traffic Light</h3>
      <p className="demo-note">
        Click a button. The state changes to a color name.
        The JSX says "if state is red, show red at full opacity."
        React handles the rest.
      </p>

      <div className="traffic-light">
        <div
          className="light-circle"
          style={{
            backgroundColor: "#e74c3c",
            opacity: light === "red" ? 1 : 0.2,
          }}
        />
        <div
          className="light-circle"
          style={{
            backgroundColor: "#f1c40f",
            opacity: light === "yellow" ? 1 : 0.2,
          }}
        />
        <div
          className="light-circle"
          style={{
            backgroundColor: "#2ecc71",
            opacity: light === "green" ? 1 : 0.2,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-danger" onClick={() => setLight("red")}>Red</button>
        <button className="btn btn-secondary" onClick={() => setLight("yellow")} style={{ backgroundColor: "#f1c40f", color: "#333" }}>Yellow</button>
        <button className="btn btn-primary" onClick={() => setLight("green")} style={{ backgroundColor: "#2ecc71" }}>Green</button>
      </div>

      <p>Current state: <strong>{light}</strong></p>
      <p className="demo-note">
        The JSX is like a template: "given this state, here's what the UI looks like."
        You change state → React re-renders → UI updates.
        You never manually toggle DOM elements on/off.
      </p>
    </div>
  );
}

// --- Section D: Re-Rendering is Not Scary ---
function ReRenderingDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // This runs every time the component renders
  console.log("RE-RENDER: This entire function just ran. count =", count, ", text =", JSON.stringify(text));

  return (
    <div className="demo-subsection">
      <h3>D. Re-Rendering is Okay!</h3>
      <p className="demo-note">
        Every click or keystroke re-runs this entire function.
        That sounds expensive, but it's actually fast!
        React compares old and new output and only touches what changed in the real DOM.
      </p>
      {console.log("RE-RENDER: computing JSX (this is cheap!)")}

      <div style={{ marginBottom: 8 }}>
        <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)} style={{ marginRight: 8 }}>
          Count: {count}
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type to trigger re-renders..."
          style={{ padding: "4px 8px" }}
        />
      </div>

      <p className="demo-note" style={{ marginTop: 12 }}>
        <strong>How React works under the hood:</strong><br />
        1. State changes (setCount/setText called)<br />
        2. React re-calls this function → gets new JSX<br />
        3. React compares new JSX with old JSX (this is called "diffing")<br />
        4. React only updates the DOM elements that actually changed<br />
        5. Browser re-paints only the changed pixels<br />
        <br />
        This is why React is fast even though the whole function re-runs!
      </p>
    </div>
  );
}

// --- Main Demo Component ---
export default function ReactVsJs() {
  return (
    <div className="demo-section">
      <h2>React vs JavaScript — A New Way to Think About UI</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the scenes.
      </p>

      <div className="side-by-side">
        <ImperativeWay />
        <DeclarativeWay />
      </div>
      <TrafficLight />
      <ReRenderingDemo />
    </div>
  );
}
