import { useState, useRef, useEffect } from "react";

// ============================================================
// useRef Demo — Values That Persist Without Re-Rendering
// ============================================================
// useRef gives you a "box" (.current) that persists across renders
// but DOES NOT trigger a re-render when changed.
// Open the browser console to follow along!
// NOTE: In development, React StrictMode runs effects twice. This is normal!

// --- Section A: Ref vs State ---
// Changing a ref does NOT update the screen. Changing state DOES.
function RefVsState() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  // This increments every render — it's a render counter!
  refCount.current += 1;

  console.log("REF VS STATE: rendering. stateCount =", stateCount, ", refCount.current =", refCount.current);

  function handleRefClick() {
    refCount.current += 100;
    // The ref changed, but React doesn't know or care — no re-render!
    console.log("REF VS STATE: ref is now", refCount.current, "(screen won't update)");
  }

  function handleStateClick() {
    // This triggers a re-render, which also increments refCount by 1
    setStateCount(prev => prev + 1);
    console.log("REF VS STATE: state changing (will re-render, and refCount will increment by 1)");
  }

  return (
    <div className="demo-subsection">
      <h3>A. useRef vs useState</h3>
      <p className="demo-note">
        Click "Change Ref" — the console updates but the screen does NOT.
        Click "Change State" — the screen updates AND the ref render count goes up.
      </p>
      <p>State count (on screen): <strong>{stateCount}</strong></p>
      <p>Ref count (on screen): <strong>{refCount.current}</strong></p>
      <p className="demo-note">
        The ref value on screen only updates when something ELSE causes a re-render.
      </p>
      <button className="btn btn-danger" onClick={handleRefClick} style={{ marginRight: 8 }}>
        Change Ref (+100, no re-render)
      </button>
      <button className="btn btn-primary" onClick={handleStateClick}>
        Change State (+1, causes re-render)
      </button>
    </div>
  );
}

// --- Section B: DOM Access ---
// useRef can hold a reference to an actual DOM element.
function DomAccess() {
  const inputRef = useRef(null);
  // inputRef.current will point to the <input> DOM node after mount

  function handleFocus() {
    // Directly calling a method on the DOM element
    inputRef.current.focus();
    console.log("DOM ACCESS: focused the input via inputRef.current.focus()");
  }

  function handleLogValue() {
    // Reading the raw DOM value — bypassing React's state
    console.log("DOM ACCESS: input's DOM value is:", JSON.stringify(inputRef.current.value));
  }

  return (
    <div className="demo-subsection">
      <h3>B. Accessing DOM Elements</h3>
      <p className="demo-note">
        ref.current points to the actual DOM node. This is React's escape hatch to the real DOM.
      </p>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something here..."
        style={{ padding: "8px 12px", fontSize: 16, marginBottom: 8, display: "block" }}
      />
      <button className="btn btn-primary" onClick={handleFocus} style={{ marginRight: 8 }}>
        Focus the Input
      </button>
      <button className="btn btn-secondary" onClick={handleLogValue}>
        Log Input Value (check console)
      </button>
    </div>
  );
}

// --- Section C: Storing Previous Value ---
// Refs persist across renders, so they're perfect for "remembering" the last value.
function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  // After each render, save the current count as the "previous" for next time
  useEffect(() => {
    console.log("PREVIOUS VALUE: saving", count, "as previous (was", prevCountRef.current, ")");
    prevCountRef.current = count;
  }, [count]);

  return (
    <div className="demo-subsection">
      <h3>C. Storing a Previous Value</h3>
      <p className="demo-note">
        The ref remembers the last value without causing extra re-renders.
      </p>
      <p>Current count: <strong>{count}</strong></p>
      <p>Previous count: <strong>{prevCountRef.current}</strong></p>
      <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)} style={{ marginRight: 8 }}>
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

// --- Section D: Stopwatch ---
// Timer IDs should be stored in refs because:
// - They need to persist across renders (so we can clear them later)
// - Changing them should NOT cause a re-render
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  function start() {
    if (timerRef.current !== null) return; // Already running
    console.log("STOPWATCH: starting interval");
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    // We store the interval ID in a ref, not state,
    // because changing it shouldn't re-render the component.
  }

  function stop() {
    console.log("STOPWATCH: stopping interval, timer ID was", timerRef.current);
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
  }

  function reset() {
    stop();
    setSeconds(0);
    console.log("STOPWATCH: reset to 0");
  }

  // Cleanup on unmount — if user switches tabs while stopwatch is running
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        console.log("STOPWATCH: cleanup — clearing interval on unmount");
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="demo-subsection">
      <h3>D. Stopwatch (timer ID in a ref)</h3>
      <p className="demo-note">
        The interval ID is stored in a ref, not state. We need it to persist (to clear later) but changing it shouldn't re-render.
      </p>
      <p style={{ fontSize: 32, fontWeight: "bold", fontFamily: "monospace" }}>
        {seconds}s
      </p>
      <button className="btn btn-primary" onClick={start} disabled={isRunning} style={{ marginRight: 8 }}>
        Start
      </button>
      <button className="btn btn-danger" onClick={stop} disabled={!isRunning} style={{ marginRight: 8 }}>
        Stop
      </button>
      <button className="btn btn-secondary" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

// --- Main Demo Component ---
export default function UseRefDemo() {
  return (
    <div className="demo-section">
      <h2>useRef — Persistent Values Without Re-Renders</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the scenes.
      </p>

      <RefVsState />
      <DomAccess />
      <PreviousValue />
      <Stopwatch />

      {/* Practical Use Cases */}
      <div className="demo-practical">
        <h3>When do you use useRef in real apps?</h3>
        <ul>
          <li><strong>Auto-focusing inputs</strong> — focus a search bar when a page loads</li>
          <li><strong>Storing timer/interval IDs</strong> — need to clear them later without re-rendering</li>
          <li><strong>Tracking previous values</strong> — for animations or comparison logic</li>
          <li><strong>Measuring DOM elements</strong> — getting element width/height for layout calculations</li>
          <li><strong>Integrating non-React libraries</strong> — a chart library that needs a DOM node to render into</li>
          <li><strong>Storing any value that should NOT trigger a re-render when it changes</strong></li>
        </ul>
        <p className="demo-note">
          Rule of thumb: if changing a value should update the screen → useState.
          If it should NOT update the screen → useRef.
        </p>
      </div>
    </div>
  );
}
