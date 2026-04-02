// ============================================================
// Section D: Full Pattern (Read + Write + Clear)
// ============================================================

import { useState, useEffect } from "react";

const STORAGE_KEY = "demo-username";

export default function FullPattern() {
  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    console.log("📂 LOCALSTORAGE: loading username — found:", saved);
    return saved || "";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, username);
    console.log("💾 LOCALSTORAGE: saved username =", JSON.stringify(username));
  }, [username]);

  function handleClear() {
    localStorage.removeItem(STORAGE_KEY);
    setUsername("");
    console.log("🗑️ LOCALSTORAGE: cleared username");
  }

  return (
    <div className="demo-subsection">
      <h3>D. Full Pattern</h3>

      <div className="form-group">
        <label htmlFor="fp-user">Username:</label>
        <input
          id="fp-user"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <p>
        Welcome, <strong>{username || "Guest"}</strong>!
      </p>

      <button className="btn btn-danger" onClick={handleClear}>
        Clear Saved Data
      </button>

      <div className="demo-note">
        The complete localStorage pattern: (1) Load on mount with lazy
        initializer, (2) Save on change with useEffect, (3) Clear with{" "}
        <code>localStorage.removeItem()</code>.
      </div>

      <div className="demo-practical">
        <h3>When do you use localStorage?</h3>
        <ul>
          <li>User preferences (theme, language)</li>
          <li>Form drafts (save progress)</li>
          <li>Last active tab or section</li>
          <li>Shopping cart items</li>
          <li>Assignment 4: persisting component state!</li>
        </ul>
      </div>
    </div>
  );
}
