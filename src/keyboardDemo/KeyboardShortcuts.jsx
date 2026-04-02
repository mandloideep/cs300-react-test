// ============================================================
// Section B: Keyboard Shortcuts
// ============================================================

import { useState, useEffect, useRef } from "react";

export default function KeyboardShortcuts() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [log, setLog] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      if (e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        console.log("⌨️ KEYBOARD: search shortcut activated");
        setSearchOpen(true);
        setLog((prev) => [...prev, `Opened search (${e.key})`]);
      }

      if (e.key === "Escape") {
        console.log("⌨️ KEYBOARD: Escape — closing search");
        setSearchOpen(false);
        setQuery("");
        setLog((prev) => [...prev, "Closed search (Escape)"]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    console.log("⌨️ KEYBOARD: registered shortcuts (/ and Cmd+K)");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      console.log("⌨️ KEYBOARD: cleaned up shortcuts");
    };
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <div className="demo-subsection">
      <h3>B. Keyboard Shortcuts</h3>

      <p>
        Press <kbd>/</kbd> or <kbd>Cmd+K</kbd> to open search. Press{" "}
        <kbd>Escape</kbd> to close.
      </p>

      {searchOpen && (
        <div className="form-group">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            style={{ fontSize: "18px", padding: "12px" }}
          />
        </div>
      )}

      {log.length > 0 && (
        <div className="card">
          <h4>Event Log:</h4>
          <ul>
            {log.slice(-5).map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="demo-note">
        The guard <code>e.target.tagName === "INPUT"</code> prevents shortcuts
        from firing while the user is typing in a text field. Without this,
        pressing "/" in the search box would reopen the search instead of typing
        a slash.
      </div>

      <div className="demo-practical">
        <h3>When do you use keyboard listeners?</h3>
        <ul>
          <li>Closing modals with Escape</li>
          <li>Search shortcuts (/, Cmd+K)</li>
          <li>Navigation (arrow keys)</li>
          <li>Accessibility (keyboard-only users)</li>
        </ul>
      </div>
    </div>
  );
}
