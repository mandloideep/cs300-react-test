import { useState, useMemo, useRef } from "react";

const STUDENTS = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  score: Math.floor(Math.random() * 100),
  grade: ["A", "B", "C", "D", "F"][Math.floor(Math.random() * 5)],
}));

function expensiveSortAndFilter(students, query, minScore) {
  const start = performance.now();

  // Simulate expensive work
  let sum = 0;
  for (let i = 0; i < 5_000_000; i++) {
    sum += i;
  }

  const result = students
    .filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) &&
        s.score >= minScore,
    )
    .sort((a, b) => b.score - a.score);

  const duration = performance.now() - start;
  return { result, duration: duration.toFixed(1) };
}

export default function ExpensiveComputation() {
  const [query, setQuery] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [count, setCount] = useState(0);
  const [useMemoEnabled, setUseMemoEnabled] = useState(false);
  const computeCount = useRef(0);
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Without useMemo — runs on EVERY render
  const withoutMemo = expensiveSortAndFilter(STUDENTS, query, minScore);

  // With useMemo — only runs when query or minScore changes
  const withMemo = useMemo(() => {
    computeCount.current += 1;
    console.log(
      "🧮 MEMO: recomputing sorted list (compute #" +
        computeCount.current +
        ")",
    );
    return expensiveSortAndFilter(STUDENTS, query, minScore);
  }, [query, minScore]);

  const active = useMemoEnabled ? withMemo : withoutMemo;

  return (
    <div className="demo-subsection">
      <h3>A. The Expensive Computation Problem</h3>
      <p className="demo-note">
        This component sorts and filters 1,000 students with a simulated heavy
        computation. Watch what happens when you click "Unrelated update" — the
        expensive work runs again even though the data hasn't changed.
      </p>

      <div style={{ margin: "16px 0" }}>
        <label style={{ cursor: "pointer", fontSize: "1rem" }}>
          <input
            type="checkbox"
            checked={useMemoEnabled}
            onChange={() => setUseMemoEnabled((u) => !u)}
            style={{ marginRight: 8 }}
          />
          <strong>Enable useMemo</strong>
        </label>
        <span style={{ marginLeft: 12 }}>
          {useMemoEnabled ? (
            <span className="tag tag-good">useMemo ON</span>
          ) : (
            <span className="tag tag-bad">useMemo OFF</span>
          )}
        </span>
        <span className="render-counter" style={{ marginLeft: 16 }}>
          Component rendered {renderCount.current} times
        </span>
      </div>

      <div
        style={{ marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="Filter by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px", fontSize: "14px", width: "180px" }}
        />
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          Min score:
          <input
            type="range"
            min={0}
            max={100}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
          />
          <span style={{ minWidth: 28 }}>{minScore}</span>
        </label>
        <button
          className="btn btn-primary"
          onClick={() => setCount((c) => c + 1)}
        >
          Unrelated update (count: {count})
        </button>
      </div>

      <div className="card">
        <p>
          <strong>Sort + filter took:</strong> {active.duration}ms
          {useMemoEnabled && (
            <span style={{ marginLeft: 8, color: "#888" }}>
              (computed {computeCount.current} times total)
            </span>
          )}
        </p>
        <p>
          <strong>Showing {active.result.length}</strong> of {STUDENTS.length}{" "}
          students
        </p>
        <ul style={{ maxHeight: 200, overflow: "auto" }}>
          {active.result.slice(0, 20).map((s) => (
            <li key={s.id}>
              {s.name} — score: {s.score} ({s.grade})
            </li>
          ))}
          {active.result.length > 20 && (
            <li style={{ color: "#888" }}>
              ...and {active.result.length - 20} more
            </li>
          )}
        </ul>
      </div>

      <div className="demo-practical">
        <h3>What just happened?</h3>
        <ul>
          <li>
            <strong>Without useMemo:</strong> every click of "Unrelated update"
            re-runs the expensive sort+filter — even though the data, query, and
            minScore haven't changed.
          </li>
          <li>
            <strong>With useMemo:</strong> the sort+filter only re-runs when{" "}
            <code>query</code> or <code>minScore</code> changes. Clicking the
            counter returns the cached result instantly.
          </li>
          <li>
            Open the console — you'll see the "recomputing" log only fires when
            the dependencies actually change.
          </li>
        </ul>
      </div>
    </div>
  );
}
