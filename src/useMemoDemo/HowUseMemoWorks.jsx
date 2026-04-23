import { useState, useMemo, useRef } from "react";

export default function HowUseMemoWorks() {
  const [query, setQuery] = useState("");
  const [threshold, setThreshold] = useState(50);
  const [count, setCount] = useState(0);
  const computeCount = useRef(0);

  const result = useMemo(() => {
    computeCount.current += 1;
    console.log(
      "🧮 MEMO: recomputing — query=" +
        JSON.stringify(query) +
        ", threshold=" +
        threshold +
        " (compute #" +
        computeCount.current +
        ")",
    );

    const items = [
      "React",
      "Vue",
      "Angular",
      "Svelte",
      "Next.js",
      "Remix",
      "Astro",
    ];
    return items
      .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
      .map((item) => ({ name: item, score: item.length * 10 }))
      .filter((item) => item.score >= threshold);
  }, [query, threshold]);

  return (
    <div className="demo-subsection">
      <h3>B. How useMemo Works</h3>
      <p className="demo-note">
        <code>useMemo</code> takes a function and a dependency array. It caches
        the <strong>return value</strong> and only recalculates when a
        dependency changes. Same rules as <code>useEffect</code> and{" "}
        <code>useCallback</code>.
      </p>

      <div className="code-block">
        <span className="comment">{"// Syntax"}</span>
        <br />
        <span className="keyword">const</span> cachedValue ={" "}
        <span className="hook">useMemo</span>(() =&gt; {"{"}
        <br />
        {"  "}
        <span className="keyword">return</span> computeSomething(a, b);
        <br />
        {"}"}, [a, b]);{" "}
        <span className="comment">{"// ← dependency array"}</span>
        <br />
        <br />
        <span className="comment">
          {"// Mental model: cache with invalidation key"}
        </span>
        <br />
        <span className="comment">
          {"// deps changed? → recompute and cache new value"}
        </span>
        <br />
        <span className="comment">
          {"// deps same?    → return cached value (skip computation)"}
        </span>
      </div>

      <h4 style={{ marginTop: 20 }}>
        Try it: two dependencies + one unrelated state
      </h4>

      <div
        style={{
          marginBottom: 16,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <label>
          Query:{" "}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter..."
            style={{ padding: "6px", fontSize: "14px", width: "120px" }}
          />
        </label>
        <label>
          Min score:{" "}
          <input
            type="range"
            min={0}
            max={100}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
          <span style={{ minWidth: 28 }}>{threshold}</span>
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
          <strong>Computed {computeCount.current} times</strong> (check console)
        </p>
        <p>Results ({result.length}):</p>
        <ul>
          {result.map((item) => (
            <li key={item.name}>
              {item.name} — score: {item.score}
            </li>
          ))}
          {result.length === 0 && <li style={{ color: "#888" }}>No matches</li>}
        </ul>
      </div>

      <div className="demo-practical">
        <h3>Dependency array rules (same as useEffect)</h3>
        <ul>
          <li>
            <code>useMemo(fn, [a, b])</code> — recomputes when <code>a</code> or{" "}
            <code>b</code> changes
          </li>
          <li>
            <code>useMemo(fn, [])</code> — computes once on mount, never again
          </li>
          <li>
            Every variable used inside the function that comes from outside
            (props, state) must be in the dependency array
          </li>
          <li>
            <strong>Fun fact:</strong> <code>useCallback(fn, deps)</code> is
            shorthand for <code>useMemo(() =&gt; fn, deps)</code> — they're the
            same mechanism
          </li>
        </ul>
      </div>
    </div>
  );
}
