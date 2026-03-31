import { useState, useEffect } from "react";

// ============================================================
// Section C: Conditional Rendering = Real Mount/Unmount
// ============================================================
// Shows that conditional rendering causes real mount/unmount cycles.
// This is NOT just hiding with CSS — React actually creates and destroys the component.
// Open the browser console to follow along!

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

export default function ConditionalMounting() {
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
