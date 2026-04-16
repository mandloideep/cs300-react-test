import { useEffect, useState } from "react";

const STORAGE_KEY = "cs300:demo:lsCounter";

function StateOnlyCounter() {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <h4><span className="tag tag-state">state</span> In-memory only</h4>
      <p>Count: <strong>{count}</strong></p>
      <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>+1</button>
      <p className="demo-note">Refresh the page → resets to 0.</p>
    </div>
  );
}

function PersistedCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(count));
  }, [count]);

  return (
    <div className="card">
      <h4><span className="tag tag-storage">localStorage</span> Persisted</h4>
      <p>Count: <strong>{count}</strong></p>
      <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>+1</button>
      <button
        className="btn btn-danger"
        style={{ marginLeft: 8 }}
        onClick={() => {
          localStorage.removeItem(STORAGE_KEY);
          setCount(0);
        }}
      >
        Clear
      </button>
      <p className="demo-note">Refresh the page → value survives.</p>
    </div>
  );
}

export default function StateVsLocalStorage() {
  return (
    <div className="demo-subsection">
      <h3>State vs localStorage — the persistence axis</h3>
      <p className="demo-note">
        Both store data, but on totally different timelines. State lives in RAM and
        dies on refresh. localStorage lives on disk and survives refreshes (and
        browser restarts).
      </p>

      <div className="side-by-side">
        <StateOnlyCounter />
        <PersistedCounter />
      </div>

      <table className="compare-table">
        <thead>
          <tr><th>Question</th><th>useState</th><th>localStorage</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Lives where?</td>
            <td>RAM (inside the React component)</td>
            <td>Disk (per-origin, browser-managed)</td>
          </tr>
          <tr>
            <td>Survives page refresh?</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Survives browser restart?</td>
            <td>No</td>
            <td>Yes (until cleared)</td>
          </tr>
          <tr>
            <td>Reactive (UI auto-updates)?</td>
            <td>Yes</td>
            <td><strong>No</strong> — you must mirror it into state</td>
          </tr>
          <tr>
            <td>What can you store?</td>
            <td>Anything (objects, functions, refs)</td>
            <td>Strings only — JSON.stringify / JSON.parse</td>
          </tr>
          <tr>
            <td>Cost to read/write?</td>
            <td>Microseconds</td>
            <td>Milliseconds; sync (blocks the main thread)</td>
          </tr>
          <tr>
            <td>Shared across tabs?</td>
            <td>No</td>
            <td>Yes (same origin)</td>
          </tr>
        </tbody>
      </table>

      <div className="demo-practical">
        <h3>The full picture: three storage layers</h3>
        <ul>
          <li><strong>useState</strong> — fast, reactive, ephemeral. Default choice for component data.</li>
          <li><strong>Context</strong> — useState that's <em>shared</em> across many components. Still ephemeral.</li>
          <li><strong>localStorage</strong> — persistent across refreshes. Not reactive — must be paired with state.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          <strong>Combine all three</strong> for things like theme, auth token, or a saved
          cart: a Context Provider that uses <code>useState</code> seeded from{" "}
          <code>localStorage</code> and writes back via <code>useEffect</code>. That's
          exactly what the next section builds.
        </p>
      </div>
    </div>
  );
}
