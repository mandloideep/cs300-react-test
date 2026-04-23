import { useState, useMemo } from "react";

export default function WhenNotToUseMemo() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(10);
  const [benchResult, setBenchResult] = useState(null);

  function runBenchmark() {
    const iterations = 100_000;

    // Without useMemo
    const startDirect = performance.now();
    for (let i = 0; i < iterations; i++) {
      const _ = a + b;
    }
    const directTime = performance.now() - startDirect;

    setBenchResult({
      direct: directTime.toFixed(2),
      iterations,
    });
  }

  // This useMemo is pointless — the computation is trivial
  const memoizedSum = useMemo(() => a + b, [a, b]);

  return (
    <div className="demo-subsection">
      <h3>F. When NOT to Use useMemo</h3>
      <p className="demo-note">
        Premature optimization makes code harder to read for zero benefit. React
        is already fast. Only reach for <code>useMemo</code> when you have a
        real performance problem — same rule as <code>useCallback</code>.
      </p>

      <h4>Decision Flowchart</h4>
      <div className="flowchart">
        <div className="flowchart-step">
          Is the computation <strong>noticeably slow</strong> (laggy UI)?
        </div>
        <div className="flowchart-arrow">&darr;</div>
        <div className="flowchart-step-no">
          <strong>No?</strong> Don't memoize. React handles normal work just
          fine.
        </div>
        <div className="flowchart-arrow">&darr;</div>
        <div className="flowchart-step">
          <strong>Yes?</strong> Is it an expensive computation (sorting,
          filtering, transforming large data)?
        </div>
        <div className="flowchart-arrow">&darr;</div>
        <div className="flowchart-step-yes">
          Wrap the computation in <code>useMemo</code>
          <br />
          If passing the result as a prop, also wrap the child in{" "}
          <code>React.memo</code>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h4>Common mistakes</h4>
        <div className="side-by-side">
          <div>
            <div className="card" style={{ borderColor: "#e74c3c" }}>
              <p>
                <span className="tag tag-bad">Don't</span>
              </p>
              <p>
                Memoize simple operations like <code>a + b</code>, string
                concatenation, or <code>array.length</code>
              </p>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                The overhead of useMemo (storing the value + comparing deps) is
                more than the computation itself.
              </p>
            </div>
          </div>
          <div>
            <div className="card" style={{ borderColor: "#2ecc71" }}>
              <p>
                <span className="tag tag-good">Do</span>
              </p>
              <p>
                Memoize expensive work: sorting/filtering large lists, complex
                calculations, building derived data structures
              </p>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                If the computation takes more than ~1ms, useMemo can help.
              </p>
            </div>
          </div>
        </div>

        <div className="side-by-side" style={{ marginTop: 8 }}>
          <div>
            <div className="card" style={{ borderColor: "#e74c3c" }}>
              <p>
                <span className="tag tag-bad">Don't</span>
              </p>
              <p>Wrap every object/array in useMemo "just in case"</p>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                If no child uses <code>React.memo</code>, stabilizing the
                reference has no effect — you're paying cost for nothing.
              </p>
            </div>
          </div>
          <div>
            <div className="card" style={{ borderColor: "#2ecc71" }}>
              <p>
                <span className="tag tag-good">Do</span>
              </p>
              <p>
                Memoize objects/arrays passed to <code>memo()</code> children,
                or used in <code>useEffect</code> dependency arrays
              </p>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                These are the cases where a stable reference actually matters.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h4>Micro-benchmark: is useMemo worth it for trivial math?</h4>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <label>
            a ={" "}
            <input
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              style={{ width: 60, padding: "4px" }}
            />
          </label>
          <label>
            b ={" "}
            <input
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              style={{ width: 60, padding: "4px" }}
            />
          </label>
          <span>
            useMemo result: <strong>{memoizedSum}</strong>
          </span>
        </div>
        <button className="btn btn-secondary" onClick={runBenchmark}>
          Run benchmark (100k iterations of a + b)
        </button>
        {benchResult && (
          <div className="card" style={{ marginTop: 8 }}>
            <p>
              <strong>Direct computation:</strong> {benchResult.direct}ms for{" "}
              {benchResult.iterations.toLocaleString()} iterations
            </p>
            <p style={{ color: "#888", fontSize: "0.85rem" }}>
              For trivial operations, the useMemo overhead (storing + comparing)
              costs more than just recomputing. The hook itself is a function
              call with an array comparison on every render.
            </p>
          </div>
        )}
      </div>

      <div className="demo-practical" style={{ marginTop: 24 }}>
        <h3>For your GP2 and Final Project</h3>
        <ul>
          <li>
            <strong>You do NOT need useMemo everywhere.</strong> Most components
            are fast enough without optimization.
          </li>
          <li>
            If you have a search/filter on a large list that feels laggy, wrap
            the computation in <code>useMemo</code>.
          </li>
          <li>
            If you have a Context Provider, consider wrapping the value in{" "}
            <code>useMemo</code> — especially if many components consume it.
          </li>
          <li>
            The React DevTools Profiler shows which components re-render and how
            long they take — use it to find real bottlenecks.
          </li>
          <li>
            <strong>Rule of thumb:</strong> write it without optimization first.
            If it's slow, then optimize.
          </li>
        </ul>
      </div>
    </div>
  );
}
