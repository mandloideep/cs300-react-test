import { useState, useEffect } from "react";

// ============================================================
// useEffect Demo — Running Code Outside the Render Cycle
// ============================================================
// useEffect lets you run "side effects" AFTER React has updated the screen.
// Side effects = anything that reaches outside the component:
//   - fetching data, setting timers, subscribing to events, logging, etc.
// Open the browser console to follow along!
// NOTE: In development, React StrictMode runs effects twice. This is normal!

// --- Section A: Render vs Effect Timing ---
function RenderVsEffect() {
  const [count, setCount] = useState(0);

  // 1️⃣ This runs DURING rendering (the function body)
  console.log("A. RENDER: component function is running, count =", count);

  // 2️⃣ This runs AFTER the browser paints the screen
  useEffect(() => {
    console.log("A. EFFECT: this runs AFTER the screen updated, count =", count);
  });

  return (
    <div className="demo-subsection">
      <h3>A. Render vs Effect Timing</h3>
      <p className="demo-note">
        Click the button and watch the console. "RENDER" logs first, then "EFFECT" logs after.
        The component function runs → React updates the DOM → browser paints → useEffect runs.
      </p>
      {console.log("A. JSX: inside the return statement, count =", count)}
      <p>Count: <strong>{count}</strong></p>
      <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)}>
        Increment (watch console order)
      </button>
    </div>
  );
}

// --- Section B: Dependency Array ---
function DependencyArray() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickCount, setClickCount] = useState(0);

  // No dependency array → runs after EVERY render
  useEffect(() => {
    console.log("B. EFFECT (no deps): runs after EVERY render");
  });

  // Empty array → runs ONCE when component first mounts
  useEffect(() => {
    console.log("B. EFFECT ([]): runs ONCE on mount");
  }, []);

  // [searchTerm] → runs when searchTerm changes
  useEffect(() => {
    console.log("B. EFFECT ([searchTerm]): searchTerm changed to", JSON.stringify(searchTerm));
  }, [searchTerm]);

  // [clickCount] → runs when clickCount changes
  useEffect(() => {
    console.log("B. EFFECT ([clickCount]): clickCount changed to", clickCount);
  }, [clickCount]);

  return (
    <div className="demo-subsection">
      <h3>B. The Dependency Array</h3>
      <p className="demo-note">
        Type in the input and click the button. Watch which effects fire in the console.
      </p>
      <div style={{ marginBottom: 8 }}>
        <label>Search: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type here..."
          style={{ padding: "4px 8px", marginLeft: 8 }}
        />
      </div>
      <button className="btn btn-secondary" onClick={() => setClickCount(prev => prev + 1)}>
        Click count: {clickCount}
      </button>
      <div className="demo-note" style={{ marginTop: 12 }}>
        <strong>Summary:</strong><br />
        • <code>useEffect(fn)</code> — no array → runs after every render<br />
        • <code>useEffect(fn, [])</code> — empty array → runs once on mount<br />
        • <code>useEffect(fn, [x])</code> — runs when x changes
      </div>
    </div>
  );
}

// --- Section C: Cleanup ---
// A sub-component that runs a setInterval and cleans it up
function TickingClock() {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    console.log("C. CLEANUP: ⏱️ starting interval (clock mounted)");

    const id = setInterval(() => {
      setTicks(prev => prev + 1);
      console.log("C. CLEANUP: ⏱️ tick");
    }, 1000);

    // This cleanup function runs:
    // 1. When the component unmounts
    // 2. Before the effect re-runs (if deps changed)
    return () => {
      console.log("C. CLEANUP: 🛑 clearing interval (clock unmounting)");
      clearInterval(id);
    };
  }, []); // Empty deps = mount once, cleanup on unmount

  return <p>Clock has ticked <strong>{ticks}</strong> times</p>;
}

function CleanupDemo() {
  const [showClock, setShowClock] = useState(false);

  return (
    <div className="demo-subsection">
      <h3>C. Cleanup Functions</h3>
      <p className="demo-note">
        Toggle the clock on/off. Watch the console — "starting interval" on mount, "clearing interval" on unmount.
        Cleanup prevents memory leaks!
      </p>
      <button
        className="btn btn-primary"
        onClick={() => {
          console.log("C. CLEANUP: toggling clock", showClock ? "OFF" : "ON");
          setShowClock(prev => !prev);
        }}
      >
        {showClock ? "Hide Clock (unmount)" : "Show Clock (mount)"}
      </button>
      {showClock && <TickingClock />}
      {/* When showClock becomes false, React unmounts TickingClock.
          The cleanup function inside its useEffect runs, clearing the interval.
          Without cleanup, the interval would keep running forever! */}
    </div>
  );
}

// --- Section D: Debounced Search ---
function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    // Set a timer to "search" after 500ms of no typing
    console.log("D. DEBOUNCE: setting 500ms timer for", JSON.stringify(query));

    const timerId = setTimeout(() => {
      console.log("D. DEBOUNCE: ✅ Timer fired! Searching for:", JSON.stringify(query));
      setDebouncedQuery(query);
    }, 500);

    // Cleanup: if the user types again before 500ms, cancel the old timer
    return () => {
      console.log("D. DEBOUNCE: ❌ Cancelled timer (user typed again)");
      clearTimeout(timerId);
    };
    // This effect runs every time query changes.
    // The cleanup cancels the PREVIOUS timer before starting a new one.
    // Result: only the LAST keystroke (after 500ms pause) triggers the "search."
  }, [query]);

  return (
    <div className="demo-subsection">
      <h3>D. Debounced Search (Practical Pattern)</h3>
      <p className="demo-note">
        Type quickly, then stop. Only the final value gets "searched" after 500ms. Watch the console!
      </p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a search query..."
        style={{ padding: "8px 12px", fontSize: 16, width: "100%", maxWidth: 300, boxSizing: "border-box" }}
      />
      <p>You typed: <strong>{query}</strong></p>
      <p>Debounced (searched) value: <strong>{debouncedQuery || "(waiting...)"}</strong></p>
    </div>
  );
}

// --- Main Demo Component ---
export default function UseEffectDemo() {
  return (
    <div className="demo-section">
      <h2>useEffect — Side Effects Outside the Render Cycle</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the scenes.
      </p>

      <RenderVsEffect />
      <DependencyArray />
      <CleanupDemo />
      <DebouncedSearch />

      {/* Practical Use Cases */}
      <div className="demo-practical">
        <h3>When do you use useEffect in real apps?</h3>
        <ul>
          <li><strong>Fetching data from an API</strong> — load user data when a profile page mounts</li>
          <li><strong>Subscribing to events</strong> — listen for window resize, WebSocket messages, keyboard shortcuts</li>
          <li><strong>Syncing with localStorage</strong> — save user preferences whenever they change</li>
          <li><strong>Updating the document title</strong> — <code>document.title = `You have $&#123;count&#125; notifications`</code></li>
          <li><strong>Setting up timers</strong> — intervals, timeouts, debouncing, polling</li>
          <li><strong>Analytics/logging</strong> — track page views or user interactions</li>
          <li><strong>Cleanup on unmount</strong> — unsubscribe, clear timers, cancel network requests</li>
        </ul>
        <p className="demo-note">
          Rule of thumb: if code needs to "reach outside" the component (browser APIs, network, DOM) → useEffect.
          If it's just computing a value from props/state → do it in the function body, no effect needed.
        </p>
      </div>
    </div>
  );
}
