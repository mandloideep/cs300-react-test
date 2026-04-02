// ============================================================
// Section C: Theme Persistence
// ============================================================

import { useState, useEffect } from "react";

export default function ThemePersistence() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("demo-theme");
    return saved === "dark";
  });

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("demo-theme", theme);
    console.log("💾 LOCALSTORAGE: saved theme =", theme);
  }, [isDark]);

  const style = {
    background: isDark ? "#1a1a2e" : "#ffffff",
    color: isDark ? "#e0e0e0" : "#333",
    padding: "24px",
    borderRadius: "8px",
    transition: "all 0.3s",
  };

  return (
    <div className="demo-subsection">
      <h3>C. Theme Persistence</h3>

      <div style={style}>
        <p>
          Current theme: <strong>{isDark ? "Dark" : "Light"}</strong>
        </p>
        <button
          className={`btn ${isDark ? "btn-secondary" : "btn-primary"}`}
          onClick={() => setIsDark((prev) => !prev)}
        >
          Switch to {isDark ? "Light" : "Dark"}
        </button>
      </div>

      <div className="demo-note">
        A real-world use case: user preferences. Toggle the theme, switch to
        another demo tab, come back — your choice is remembered.
      </div>
    </div>
  );
}
