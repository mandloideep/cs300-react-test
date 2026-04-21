import { useState, useMemo, useRef } from "react";

const ALL_ITEMS = [
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Next.js",
  "Remix",
  "Astro",
  "Gatsby",
  "Nuxt",
  "SolidJS",
  "Preact",
  "Ember",
  "Backbone",
  "jQuery",
  "Alpine.js",
  "Lit",
  "Stencil",
  "Qwik",
  "Fresh",
  "Hono",
];

function slowFilter(items, query) {
  const start = performance.now();
  // Simulate expensive work
  let sum = 0;
  for (let i = 0; i < 5_000_000; i++) {
    sum += i;
  }
  const duration = performance.now() - start;

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  return { filtered, duration: duration.toFixed(1) };
}

export default function UseMemoDemo() {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const [useMemoEnabled, setUseMemoEnabled] = useState(false);
  const computeCount = useRef(0);

  // Without useMemo — runs the expensive filter on EVERY render
  const withoutMemo = slowFilter(ALL_ITEMS, query);

  // With useMemo — only runs when query changes
  const withMemo = useMemo(() => {
    computeCount.current += 1;
    return slowFilter(ALL_ITEMS, query);
  }, [query]);

  const active = useMemoEnabled ? withMemo : withoutMemo;

  return (
    <div className="demo-subsection">
      <h3>useMemo — Memoizing Expensive Values</h3>
      <p className="demo-note">
        <code>useMemo</code> caches a <strong>computed value</strong> and only
        recalculates when its dependencies change. Same dependency array as
        useCallback and useEffect.
      </p>

      <div className="code-block">
        <span className="comment">
          {"// Without useMemo — runs every render"}
        </span>
        <br />
        <span className="keyword">const</span> filtered = expensiveFilter(items,
        query);
        <br />
        <br />
        <span className="comment">
          {"// With useMemo — only runs when query changes"}
        </span>
        <br />
        <span className="keyword">const</span> filtered ={" "}
        <span className="hook">useMemo</span>(() =&gt; {"{"}
        <br />
        {"  "}
        <span className="keyword">return</span> expensiveFilter(items, query);
        <br />
        {"}"}, [items, query]);
      </div>

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
      </div>

      <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
        <input
          type="text"
          placeholder="Filter frameworks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px", fontSize: "14px", width: "200px" }}
        />
        <button
          className="btn btn-primary"
          onClick={() => setCount((c) => c + 1)}
        >
          Unrelated update (count: {count})
        </button>
      </div>

      <div className="card">
        <p>
          <strong>Filter took:</strong> {active.duration}ms
          {useMemoEnabled && (
            <span style={{ marginLeft: 8, color: "#888" }}>
              (computed {computeCount.current} times total)
            </span>
          )}
        </p>
        <p>
          <strong>Results ({active.filtered.length}):</strong>
        </p>
        <ul>
          {active.filtered.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="demo-practical">
        <h3>useCallback vs useMemo</h3>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Hook</th>
              <th>Caches</th>
              <th>Use when</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>useCallback(fn, deps)</code>
              </td>
              <td>A function reference</td>
              <td>Passing callbacks as props to memoized children</td>
            </tr>
            <tr>
              <td>
                <code>useMemo(() =&gt; value, deps)</code>
              </td>
              <td>A computed value</td>
              <td>Expensive calculations (filtering, sorting, transforming)</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: 8, color: "#666" }}>
          Fun fact: <code>useCallback(fn, deps)</code> is shorthand for{" "}
          <code>useMemo(() =&gt; fn, deps)</code>
        </p>
      </div>
    </div>
  );
}
