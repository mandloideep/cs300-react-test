import { useState, useMemo, useRef, memo } from "react";

function UserCardNormal({ user, label }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="card">
      <strong>{label}</strong>
      <span className="render-counter">
        Rendered {renderCount.current} times
      </span>
      <p style={{ marginTop: 8 }}>
        {user.name} — {user.role} ({user.level})
      </p>
    </div>
  );
}

const UserCardMemoized = memo(function UserCardMemoized({ user, label }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="card">
      <strong>{label}</strong>
      <span className="render-counter render-counter-good">
        Rendered {renderCount.current} times
      </span>
      <p style={{ marginTop: 8 }}>
        {user.name} — {user.role} ({user.level})
      </p>
    </div>
  );
});

export default function UseMemoReactMemo() {
  const [count, setCount] = useState(0);

  // Without useMemo — new object every render
  const userInline = { name: "Alice", role: "Admin", level: "Senior" };

  // With useMemo — stable object reference
  const userMemoized = useMemo(
    () => ({ name: "Alice", role: "Admin", level: "Senior" }),
    [],
  );

  return (
    <div className="demo-subsection">
      <h3>D. useMemo + React.memo — The Full Picture</h3>
      <p className="demo-note">
        Just like <code>useCallback</code>, <code>useMemo</code> alone does NOT
        prevent re-renders. The child must also be wrapped in{" "}
        <code>React.memo</code> so it checks whether props actually changed.
      </p>

      <div style={{ marginBottom: 16 }}>
        <button
          className="btn btn-primary"
          onClick={() => setCount((c) => c + 1)}
        >
          Unrelated update (count: {count})
        </button>
        <span style={{ marginLeft: 12, color: "#666" }}>
          Click and watch all four render counters
        </span>
      </div>

      <div className="side-by-side">
        <div>
          <h4 style={{ color: "#e74c3c" }}>Inline object + no memo</h4>
          <UserCardNormal user={userInline} label="UserCard (normal)" />
          <p style={{ fontSize: "0.85rem", color: "#888" }}>
            New object + no memo = re-renders every time
          </p>
        </div>
        <div>
          <h4 style={{ color: "#e74c3c" }}>useMemo + no memo</h4>
          <UserCardNormal
            user={userMemoized}
            label="UserCard (useMemo, no memo)"
          />
          <p style={{ fontSize: "0.85rem", color: "#888" }}>
            Stable object but child doesn't check = still re-renders
          </p>
        </div>
      </div>

      <div className="side-by-side" style={{ marginTop: 12 }}>
        <div>
          <h4 style={{ color: "#e74c3c" }}>Inline object + React.memo</h4>
          <UserCardMemoized
            user={userInline}
            label="UserCard (memo, inline obj)"
          />
          <p style={{ fontSize: "0.85rem", color: "#888" }}>
            Memo checks but sees new object ref = still re-renders
          </p>
        </div>
        <div>
          <h4 style={{ color: "#2ecc71" }}>useMemo + React.memo</h4>
          <UserCardMemoized
            user={userMemoized}
            label="UserCard (memo + useMemo)"
          />
          <p style={{ fontSize: "0.85rem", color: "#888" }}>
            Stable ref + memo check = skips re-render
          </p>
        </div>
      </div>

      <div className="demo-practical">
        <h3>The combo table</h3>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Parent passes</th>
              <th>Child uses</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Inline object</td>
              <td>No memo</td>
              <td>
                <span className="tag tag-bad">Re-renders every time</span>
              </td>
            </tr>
            <tr>
              <td>useMemo'd object</td>
              <td>No memo</td>
              <td>
                <span className="tag tag-bad">Still re-renders</span>
              </td>
            </tr>
            <tr>
              <td>Inline object</td>
              <td>React.memo</td>
              <td>
                <span className="tag tag-bad">Still re-renders (new ref)</span>
              </td>
            </tr>
            <tr>
              <td>useMemo'd object</td>
              <td>React.memo</td>
              <td>
                <span className="tag tag-good">Skips re-render</span>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ marginTop: 16 }}>The complete optimization toolkit</h3>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Prop type</th>
              <th>Stabilize with</th>
              <th>Child needs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Callback function</td>
              <td>
                <code>useCallback</code>
              </td>
              <td>
                <code>React.memo</code>
              </td>
            </tr>
            <tr>
              <td>Object / array / computed value</td>
              <td>
                <code>useMemo</code>
              </td>
              <td>
                <code>React.memo</code>
              </td>
            </tr>
            <tr>
              <td>Primitive (string, number, boolean)</td>
              <td>Nothing needed</td>
              <td>
                <code>React.memo</code> (compares by value)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
