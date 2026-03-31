import { useState, useEffect } from "react";

// ============================================================
// Section C: Mouse Position Tracker
// ============================================================
// Tracks the mouse position across the entire document.
// Demonstrates toggling a subscription on/off with useEffect.
// Open the browser console to follow along!

export default function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (!tracking) return;

    console.log("MOUSE TRACKER: 🖱️ subscribing to mousemove");

    function handleMouseMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      console.log("MOUSE TRACKER: 🖱️ unsubscribing from mousemove");
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tracking]);

  return (
    <div className="demo-subsection">
      <h3>C. Mouse Position Tracker</h3>
      <p className="demo-note">
        Toggle tracking on, then move your mouse. The position updates in real-time.
        Toggle off to unsubscribe — check the console for subscribe/unsubscribe logs.
      </p>

      <button
        className={`btn ${tracking ? "btn-danger" : "btn-primary"}`}
        onClick={() => setTracking(prev => !prev)}
        style={{ marginBottom: 12 }}
      >
        {tracking ? "Stop Tracking" : "Start Tracking"}
      </button>

      <div style={{
        fontFamily: "monospace",
        fontSize: 24,
        fontWeight: "bold",
        padding: 16,
        backgroundColor: tracking ? "#eef6ff" : "#f5f5f5",
        borderRadius: 8,
        border: `2px solid ${tracking ? "#3498db" : "#ddd"}`,
        transition: "all 0.3s",
      }}>
        x: {position.x}, y: {position.y}
      </div>

      {tracking && (
        <p className="demo-note" style={{ marginTop: 8 }}>
          Move your mouse anywhere on the page!
        </p>
      )}
    </div>
  );
}
