import { useState, useEffect, useRef } from "react";

// ============================================================
// Lifecycle Demo — Understanding When React Does What
// ============================================================
// Every React component goes through a lifecycle:
//   1. MOUNT — component appears on screen for the first time
//   2. RE-RENDER — component updates because state or props changed
//   3. UNMOUNT — component is removed from the screen
//
// This file shows you EXACTLY what happens at each stage.
// Open the browser console and watch the numbered logs!
// NOTE: In development, React StrictMode runs effects twice. This is normal!

// --- Section A: The Full Lifecycle Timeline ---
// This component logs every phase so you can see the order.
function LifecycleTimeline() {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  // This runs in the FUNCTION BODY — during rendering
  console.log(`TIMELINE [render #${renderCountRef.current}]: 1️⃣ Function body runs (computing JSX). count = ${count}`);

  // Mount effect — runs ONCE after the first render
  useEffect(() => {
    console.log("TIMELINE: 2️⃣ MOUNT effect — component just appeared on screen");
    console.log("TIMELINE:    This is where you'd fetch initial data or set up subscriptions.");

    return () => {
      console.log("TIMELINE: 5️⃣ UNMOUNT cleanup — component is being removed from screen");
      console.log("TIMELINE:    This is where you'd cancel subscriptions or clear timers.");
    };
  }, []);

  // Update effect — runs when count changes
  useEffect(() => {
    console.log(`TIMELINE: 3️⃣ UPDATE effect — count changed to ${count}`);
    console.log("TIMELINE:    This is where you'd react to specific state changes.");

    return () => {
      console.log(`TIMELINE: 4️⃣ CLEANUP before next update — cleaning up for count = ${count}`);
      console.log("TIMELINE:    The OLD effect cleans up before the NEW effect runs.");
    };
  }, [count]);

  return (
    <div className="demo-subsection">
      <h3>A. The Full Lifecycle Timeline</h3>
      <p className="demo-note">
        Click the button and watch the console. The logs are numbered in the order they execute.
        Then switch to another tab to see the UNMOUNT log.
      </p>
      {console.log(`TIMELINE [render #${renderCountRef.current}]: 1b️⃣ Inside JSX return (still rendering)`)}
      <p>Count: <strong>{count}</strong> (render #{renderCountRef.current})</p>
      <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)}>
        Increment (triggers re-render)
      </button>

      <div className="demo-note" style={{ marginTop: 12 }}>
        <strong>Execution order on first render (mount):</strong><br />
        1️⃣ Function body runs → computes JSX<br />
        1b️⃣ JSX return executes (including inline console.logs)<br />
        2️⃣ React updates the DOM → browser paints<br />
        2️⃣ Mount effect runs (empty deps [])<br />
        3️⃣ Update effect runs ([count] changed from nothing to 0)<br />
        <br />
        <strong>On each subsequent click:</strong><br />
        1️⃣ Function body runs again with new count<br />
        4️⃣ Old update effect cleans up<br />
        3️⃣ New update effect runs with new count<br />
        <br />
        <strong>When component unmounts (switch tabs):</strong><br />
        4️⃣ Update effect cleanup runs<br />
        5️⃣ Mount effect cleanup runs
      </div>
    </div>
  );
}

// --- Section B: Parent-Child Lifecycle ---
// Shows that parent renders BEFORE child, but effects run AFTER all children.
function Child({ name, value }) {
  console.log(`PARENT-CHILD: 📦 ${name} function body runs (value = ${value})`);

  useEffect(() => {
    console.log(`PARENT-CHILD: ✅ ${name} effect runs (value = ${value})`);
    return () => {
      console.log(`PARENT-CHILD: 🧹 ${name} cleanup (value = ${value})`);
    };
  }, [name, value]);

  return (
    <div className="card" style={{ margin: "4px 0" }}>
      {console.log(`PARENT-CHILD: 📦 ${name} JSX rendering`)}
      <strong>{name}</strong>: value = {value}
    </div>
  );
}

function ParentChildLifecycle() {
  const [parentCount, setParentCount] = useState(0);

  console.log("PARENT-CHILD: 📦 Parent function body runs (parentCount =", parentCount, ")");

  useEffect(() => {
    console.log("PARENT-CHILD: ✅ Parent effect runs");
    return () => {
      console.log("PARENT-CHILD: 🧹 Parent cleanup");
    };
  }, [parentCount]);

  return (
    <div className="demo-subsection">
      <h3>B. Parent-Child Render Order</h3>
      <p className="demo-note">
        Click the button and watch the console. The render order is:
        Parent body → Child A body → Child B body → Child A effect → Child B effect → Parent effect.
        React renders top-down but runs effects bottom-up!
      </p>
      {console.log("PARENT-CHILD: 📦 Parent JSX rendering")}

      <Child name="Child A" value={parentCount} />
      <Child name="Child B" value={parentCount * 10} />

      <button
        className="btn btn-primary"
        onClick={() => setParentCount(prev => prev + 1)}
        style={{ marginTop: 8 }}
      >
        Update Parent (count: {parentCount})
      </button>

      <div className="demo-note" style={{ marginTop: 12 }}>
        <strong>Render phase (top-down):</strong> Parent body → Child A body → Child B body<br />
        <strong>Effect phase (bottom-up):</strong> Child A effect → Child B effect → Parent effect<br />
        <br />
        React finishes ALL rendering first, then runs effects from deepest child up to parent.
      </div>
    </div>
  );
}

// --- Section C: Conditional Rendering & Mount/Unmount ---
// Shows that conditional rendering causes real mount/unmount cycles.
function Notification({ type }) {
  useEffect(() => {
    console.log(`CONDITIONAL: 🟢 ${type} notification MOUNTED`);
    return () => {
      console.log(`CONDITIONAL: 🔴 ${type} notification UNMOUNTED`);
    };
  }, [type]);

  const colors = {
    success: { bg: "#d4edda", border: "#28a745", text: "Operation successful!" },
    warning: { bg: "#fff3cd", border: "#ffc107", text: "Please check your input." },
    error: { bg: "#f8d7da", border: "#dc3545", text: "Something went wrong!" },
  };

  const style = colors[type] || colors.success;

  return (
    <div style={{
      padding: "12px 16px",
      backgroundColor: style.bg,
      border: `2px solid ${style.border}`,
      borderRadius: 6,
      margin: "8px 0",
    }}>
      <strong>{type.toUpperCase()}:</strong> {style.text}
    </div>
  );
}

function ConditionalMounting() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="demo-subsection">
      <h3>C. Conditional Rendering = Real Mount/Unmount</h3>
      <p className="demo-note">
        Toggle each notification. Watch the console — each toggle is a real mount or unmount.
        This is NOT just hiding with CSS. React actually creates and destroys the component.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          className={`btn ${showSuccess ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setShowSuccess(prev => !prev)}
        >
          {showSuccess ? "Hide" : "Show"} Success
        </button>
        <button
          className={`btn ${showWarning ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setShowWarning(prev => !prev)}
        >
          {showWarning ? "Hide" : "Show"} Warning
        </button>
        <button
          className={`btn ${showError ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setShowError(prev => !prev)}
        >
          {showError ? "Hide" : "Show"} Error
        </button>
      </div>

      {showSuccess && <Notification type="success" />}
      {showWarning && <Notification type="warning" />}
      {showError && <Notification type="error" />}

      {!showSuccess && !showWarning && !showError && (
        <p className="demo-note">No notifications shown. Toggle one above!</p>
      )}
    </div>
  );
}

// --- Section D: Effect Dependencies Visualized ---
// A clear visual showing which effects run based on what changed.
function EffectDepsVisualized() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [effectLog, setEffectLog] = useState([]);

  function addLog(message) {
    const timestamp = new Date().toLocaleTimeString();
    setEffectLog(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 15));
  }

  // No deps — runs after EVERY render
  useEffect(() => {
    const msg = "🔄 No deps: runs after EVERY render";
    console.log("DEPS VISUALIZED:", msg);
    addLog(msg);
  });

  // Empty deps — runs ONCE on mount
  useEffect(() => {
    const msg = "📌 Empty []: runs ONCE on mount";
    console.log("DEPS VISUALIZED:", msg);
    addLog(msg);
  }, []);

  // [name] — runs when name changes
  useEffect(() => {
    const msg = `📝 [name]: name changed to "${name}"`;
    console.log("DEPS VISUALIZED:", msg);
    addLog(msg);
  }, [name]);

  // [age] — runs when age changes
  useEffect(() => {
    const msg = `🔢 [age]: age changed to ${age}`;
    console.log("DEPS VISUALIZED:", msg);
    addLog(msg);
  }, [age]);

  return (
    <div className="demo-subsection">
      <h3>D. Effect Dependencies Visualized</h3>
      <p className="demo-note">
        Change the name or age. The log below shows which effects fired and why.
        Notice: "No deps" fires on EVERY change, but "[name]" only fires when you type.
      </p>

      <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type a name..."
            style={{ padding: "4px 8px" }}
          />
        </div>
        <div>
          <label>Age: </label>
          <button className="btn btn-secondary" onClick={() => setAge(prev => prev + 1)}>
            {age} (click +1)
          </button>
        </div>
      </div>

      <div style={{
        backgroundColor: "#1e1e1e",
        color: "#d4d4d4",
        padding: 12,
        borderRadius: 6,
        fontFamily: "monospace",
        fontSize: 13,
        maxHeight: 200,
        overflow: "auto",
      }}>
        <strong style={{ color: "#569cd6" }}>Effect Log (newest first):</strong>
        {effectLog.length === 0 && <p style={{ color: "#666" }}>Interact with the inputs above...</p>}
        {effectLog.map((log, i) => (
          <div key={i} style={{ opacity: 1 - i * 0.06 }}>{log}</div>
        ))}
      </div>
    </div>
  );
}

// --- Main Demo Component ---
export default function LifecycleDemo() {
  return (
    <div className="demo-section">
      <h2>Lifecycle — When React Does What</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see the full lifecycle logs.
        This page also shows an on-screen log for the dependency visualization.
      </p>

      <LifecycleTimeline />
      <ParentChildLifecycle />
      <ConditionalMounting />
      <EffectDepsVisualized />

      {/* Practical Use Cases */}
      <div className="demo-practical">
        <h3>Why does the lifecycle matter?</h3>
        <ul>
          <li><strong>Mount</strong> — fetch data, set up event listeners, start animations</li>
          <li><strong>Update</strong> — react to state/prop changes, sync external systems</li>
          <li><strong>Unmount</strong> — clean up timers, cancel network requests, remove event listeners</li>
          <li><strong>Parent-child order</strong> — know that children finish rendering before parent effects run</li>
          <li><strong>Conditional rendering</strong> — toggling a component is a real mount/unmount, not just CSS display:none</li>
        </ul>
        <p className="demo-note">
          Understanding the lifecycle helps you debug: "Why did my effect run twice?"
          "Why is my cleanup not firing?" "When does my data fetch happen?"
        </p>
      </div>
    </div>
  );
}
