import { useState, useEffect } from "react";

// ============================================================
// Section D: Effect Dependencies Visualized
// ============================================================
// A clear visual showing which effects run based on what changed.
// The on-screen log shows you exactly which effects fired and why.
// Open the browser console to follow along!

export default function EffectDepsVisualized() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [effectLog, setEffectLog] = useState([]);

  function addLog(message) {
    const timestamp = new Date().toLocaleTimeString();
    setEffectLog((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 15));
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
        Notice: "No deps" fires on EVERY change, but "[name]" only fires when
        you type.
      </p>

      <div
        style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}
      >
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
          <button
            className="btn btn-secondary"
            onClick={() => setAge((prev) => prev + 1)}
          >
            {age} (click +1)
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          padding: 12,
          borderRadius: 6,
          fontFamily: "monospace",
          fontSize: 13,
          maxHeight: 200,
          overflow: "auto",
        }}
      >
        <strong style={{ color: "#569cd6" }}>Effect Log (newest first):</strong>
        {effectLog.length === 0 && (
          <p style={{ color: "#666" }}>Interact with the inputs above...</p>
        )}
        {effectLog.map((log, i) => (
          <div key={i} style={{ opacity: 1 - i * 0.06 }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
