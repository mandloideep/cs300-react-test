import { useState } from "react";
import Shell from "./Shell";

// ============================================================
// Section C: Props Flow Down (One-Way Data Flow)
// ============================================================
// The parent owns the theme state. It passes it down as a prop.
// Data flows DOWN: Parent → Shell → Card → Text.
// Children can NOT change the parent's state directly.
// Open the browser console to follow along!

function ThemedText({ theme, children }) {
  console.log("THEMED TEXT: received theme =", JSON.stringify(theme));
  return (
    <p style={{
      color: theme === "dark" ? "#ecf0f1" : "#2c3e50",
      fontWeight: "bold",
    }}>
      {children}
    </p>
  );
}

function ThemedCard({ theme, title, children }) {
  console.log("THEMED CARD: received theme =", JSON.stringify(theme));
  return (
    <div className="card" style={{
      backgroundColor: theme === "dark" ? "#34495e" : "#fff",
      borderColor: theme === "dark" ? "#2c3e50" : "#ddd",
    }}>
      <ThemedText theme={theme}>{title}</ThemedText>
      <div style={{ color: theme === "dark" ? "#bdc3c7" : "#333" }}>
        {children}
      </div>
    </div>
  );
}

export default function PropsFlowDemo() {
  const [theme, setTheme] = useState("light");

  console.log("PROPS FLOW: parent rendering with theme =", JSON.stringify(theme));

  return (
    <div className="demo-subsection">
      <h3>C. Props Flow Down (One-Way Data Flow)</h3>
      <p className="demo-note">
        The parent owns the theme state. It passes it down as a prop.
        Toggle the theme and watch the console — every level re-renders with the new value.
      </p>

      <button
        className="btn btn-primary"
        onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
        style={{ marginBottom: 12 }}
      >
        Toggle Theme (current: {theme})
      </button>

      <Shell
        backgroundColor={theme === "dark" ? "#2c3e50" : "#3498db"}
        textColor="#fff"
        title={`Shell — theme: ${theme}`}
      >
        <ThemedCard theme={theme} title="Themed Card">
          <p>This text color comes from the theme prop, which started at the TOP.</p>
          <p>Data flows DOWN: Parent → Shell → Card → Text</p>
        </ThemedCard>
      </Shell>

      <p className="demo-note">
        <strong>One-way data flow:</strong> Parent → Child → Grandchild.
        Children can NOT change the parent's state directly.
        If a child needs to communicate up, it uses a callback function (next section!).
      </p>
    </div>
  );
}
