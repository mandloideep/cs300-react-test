import { useState, useEffect } from "react";

// ============================================================
// Section B: The Dependency Array
// ============================================================
// The second argument to useEffect controls WHEN the effect runs:
//   - No array    → runs after EVERY render
//   - Empty []    → runs ONCE on mount
//   - [x]         → runs when x changes
// Open the browser console to follow along!

export default function DependencyArray() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickCount, setClickCount] = useState(0);

  // No dependency array → runs after EVERY render
  useEffect(() => {
    console.log("B. EFFECT (no deps): runs after EVERY render");
  });

  // Empty array → runs ONCE when component first mounts
  useEffect(() => {
    console.log("B. EFFECT ([]): runs ONCE on mount");
  }, []);

  // [searchTerm] → runs when searchTerm changes
  useEffect(() => {
    console.log("B. EFFECT ([searchTerm]): searchTerm changed to", JSON.stringify(searchTerm));
  }, [searchTerm]);

  // [clickCount] → runs when clickCount changes
  useEffect(() => {
    console.log("B. EFFECT ([clickCount]): clickCount changed to", clickCount);
  }, [clickCount]);

  return (
    <div className="demo-subsection">
      <h3>B. The Dependency Array</h3>
      <p className="demo-note">
        Type in the input and click the button. Watch which effects fire in the console.
      </p>
      <div style={{ marginBottom: 8 }}>
        <label>Search: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type here..."
          style={{ padding: "4px 8px", marginLeft: 8 }}
        />
      </div>
      <button className="btn btn-secondary" onClick={() => setClickCount(prev => prev + 1)}>
        Click count: {clickCount}
      </button>
      <div className="demo-note" style={{ marginTop: 12 }}>
        <strong>Summary:</strong><br />
        • <code>useEffect(fn)</code> — no array → runs after every render<br />
        • <code>useEffect(fn, [])</code> — empty array → runs once on mount<br />
        • <code>useEffect(fn, [x])</code> — runs when x changes
      </div>
    </div>
  );
}
