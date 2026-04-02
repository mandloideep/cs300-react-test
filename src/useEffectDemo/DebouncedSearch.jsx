import { useState, useEffect } from "react";

// ============================================================
// Section D: Debounced Search (Practical Pattern)
// ============================================================
// A common real-world pattern: wait for the user to STOP typing
// before performing an expensive operation (like an API call).
// useEffect + cleanup makes this elegant.
// Open the browser console to follow along!

export default function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    // Set a timer to "search" after 500ms of no typing
    console.log("D. DEBOUNCE: setting 500ms timer for", JSON.stringify(query));

    const timerId = setTimeout(() => {
      console.log(
        "D. DEBOUNCE: ✅ Timer fired! Searching for:",
        JSON.stringify(query),
      );
      setDebouncedQuery(query);
    }, 2000);

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
        Type quickly, then stop. Only the final value gets "searched" after
        500ms. Watch the console!
      </p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a search query..."
        style={{
          padding: "8px 12px",
          fontSize: 16,
          width: "100%",
          boxSizing: "border-box",
        }}
      />
      <p>
        You typed: <strong>{query}</strong>
      </p>
      <p>
        Debounced (searched) value:{" "}
        <strong>{debouncedQuery || "(waiting...)"}</strong>
      </p>
    </div>
  );
}
