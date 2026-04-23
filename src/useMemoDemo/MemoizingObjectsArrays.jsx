import { useState, useMemo, useRef, memo } from "react";

const SettingsPanel = memo(function SettingsPanel({ config }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="card">
      <strong>SettingsPanel (memo'd child)</strong>
      <span className="render-counter">
        Rendered {renderCount.current} times
      </span>
      <pre style={{ marginTop: 8, fontSize: "0.85rem", color: "#555" }}>
        {JSON.stringify(config, null, 2)}
      </pre>
    </div>
  );
});

export default function MemoizingObjectsArrays() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");
  const [useMemoEnabled, setUseMemoEnabled] = useState(false);
  const [refTestResult, setRefTestResult] = useState(null);

  // Without useMemo — new object every render
  const configInline = { theme, pageSize: 10, showSidebar: true };

  // With useMemo — same object reference between renders
  const configMemoized = useMemo(
    () => ({ theme, pageSize: 10, showSidebar: true }),
    [theme],
  );

  if (useMemoEnabled) {
    console.log("🧮 MEMO: reusing cached config object");
  } else {
    console.log("📦 OBJECT: new config object created");
  }

  return (
    <div className="demo-subsection">
      <h3>C. Memoizing Objects & Arrays</h3>
      <p className="demo-note">
        <code>useCallback</code> stabilizes <strong>function</strong>{" "}
        references. <code>useMemo</code> stabilizes{" "}
        <strong>object and array</strong> references. Same principle: prevent
        unnecessary re-renders of memo'd children.
      </p>

      <h4>Reference equality test</h4>
      <div style={{ marginBottom: 16 }}>
        <button
          className="btn btn-secondary"
          onClick={() => {
            const obj1 = { a: 1 };
            const obj2 = { a: 1 };
            const arr1 = [1, 2, 3];
            const arr2 = [1, 2, 3];
            setRefTestResult({
              objects: obj1 === obj2,
              arrays: arr1 === arr2,
            });
          }}
        >
          Test: are identical objects/arrays equal?
        </button>
        {refTestResult && (
          <div style={{ marginTop: 8 }}>
            <code>{`{a: 1} === {a: 1}`}</code> →{" "}
            <span className="tag tag-bad">{String(refTestResult.objects)}</span>
            <br />
            <code>{`[1,2,3] === [1,2,3]`}</code> →{" "}
            <span className="tag tag-bad">{String(refTestResult.arrays)}</span>
            <p style={{ color: "#888", fontSize: "0.85rem", marginTop: 4 }}>
              Each render creates a new object in memory — even if the values
              are identical, it's a different reference.
            </p>
          </div>
        )}
      </div>

      <div style={{ margin: "16px 0" }}>
        <label style={{ cursor: "pointer", fontSize: "1rem" }}>
          <input
            type="checkbox"
            checked={useMemoEnabled}
            onChange={() => setUseMemoEnabled((u) => !u)}
            style={{ marginRight: 8 }}
          />
          <strong>Enable useMemo for config object</strong>
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
        <button
          className="btn btn-primary"
          onClick={() => setCount((c) => c + 1)}
        >
          Unrelated update (count: {count})
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          Toggle theme ({theme})
        </button>
      </div>

      <SettingsPanel config={useMemoEnabled ? configMemoized : configInline} />

      <div className="demo-practical">
        <h3>useCallback vs useMemo — what they cache</h3>
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
              <td>Passing callbacks to memo'd children</td>
            </tr>
            <tr>
              <td>
                <code>useMemo(() =&gt; value, deps)</code>
              </td>
              <td>Any value (object, array, number, etc.)</td>
              <td>
                Passing data props to memo'd children, expensive computations
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
