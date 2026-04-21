import { useState } from "react";

export default function WhyFunctionsChange() {
  const [result, setResult] = useState(null);

  const runTest = () => {
    const fnA = () => console.log("hello");
    const fnB = () => console.log("hello");

    setResult({
      sameCode: true,
      sameReference: fnA === fnB,
    });
  };

  const [renders, setRenders] = useState([]);

  const simulateRenders = () => {
    const log = [];

    for (let i = 1; i <= 3; i++) {
      const handler = () => {};
      log.push({
        render: i,
        id: handler.toString().slice(0, 20),
        note: `New function object created (render ${i})`,
      });
    }

    setRenders(log);
  };

  return (
    <div className="demo-subsection">
      <h3>Why Functions "Change" Every Render</h3>
      <p className="demo-note">
        In JavaScript, two functions are only <code>===</code> equal if they are
        the <strong>exact same object in memory</strong>. Even if they have
        identical code, they are different objects.
      </p>

      <div style={{ marginBottom: 16 }}>
        <button className="btn btn-primary" onClick={runTest}>
          Test: are two identical functions ===?
        </button>
      </div>

      {result && (
        <div className="card">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Do they have the same code?</td>
                <td>
                  <span className="tag tag-good">Yes</span> Both do{" "}
                  <code>console.log("hello")</code>
                </td>
              </tr>
              <tr>
                <td>
                  Are they <code>===</code> equal?
                </td>
                <td>
                  <span className="tag tag-bad">
                    {result.sameReference ? "Yes" : "No"}
                  </span>{" "}
                  Different objects in memory
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: 24, marginBottom: 16 }}>
        <button className="btn btn-secondary" onClick={simulateRenders}>
          Simulate 3 renders creating a handler
        </button>
      </div>

      {renders.length > 0 && (
        <div className="card">
          <p>
            <strong>Each render creates a new function object:</strong>
          </p>
          {renders.map((r) => (
            <div
              key={r.render}
              style={{
                padding: "8px 12px",
                margin: "4px 0",
                background: "#fef0f0",
                borderRadius: 4,
                fontFamily: "monospace",
                fontSize: "0.9rem",
              }}
            >
              Render {r.render}: <code>const handler = () =&gt; {"{}"}</code>{" "}
              <span className="tag tag-bad">new object</span>
            </div>
          ))}
          <p style={{ marginTop: 12, color: "#666" }}>
            React compares props with <code>===</code>. Since each render
            creates a new function object, React thinks the prop changed — even
            though the function does the exact same thing.
          </p>
        </div>
      )}

      <div className="demo-practical">
        <h3>The mental model</h3>
        <ul>
          <li>
            <code>const handler = () =&gt; {"{}"}</code> inside a component runs
            on <strong>every render</strong>.
          </li>
          <li>
            Each run produces a <strong>new function object</strong>.
          </li>
          <li>
            React uses <code>===</code> to compare old props vs new props.
          </li>
          <li>New object !== old object, so React re-renders the child.</li>
          <li>
            <strong>useCallback</strong> tells React: "reuse the same function
            object between renders."
          </li>
        </ul>
      </div>
    </div>
  );
}
