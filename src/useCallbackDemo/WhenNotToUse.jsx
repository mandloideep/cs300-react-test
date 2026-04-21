export default function WhenNotToUse() {
  return (
    <div className="demo-subsection">
      <h3>When NOT to Use useCallback / useMemo / memo</h3>
      <p className="demo-note">
        Premature optimization makes code harder to read for zero benefit. React
        is already fast. Only reach for these when you have a real performance
        problem.
      </p>

      <h4>Decision Flowchart</h4>
      <div className="flowchart">
        <div className="flowchart-step">
          Is the child component <strong>visually slow</strong> to update?
        </div>
        <div className="flowchart-arrow">&darr;</div>
        <div className="flowchart-step-no">
          <strong>No?</strong> Don't optimize. React is fast enough.
        </div>
        <div className="flowchart-arrow">&darr;</div>
        <div className="flowchart-step">
          <strong>Yes?</strong> Is the slowness from a parent re-render (not its
          own state)?
        </div>
        <div className="flowchart-arrow">&darr;</div>
        <div className="flowchart-step-yes">
          Wrap the child in <code>React.memo</code>
          <br />+ wrap callbacks with <code>useCallback</code>
          <br />+ wrap computed values with <code>useMemo</code>
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
              <p>Wrap every function in useCallback "just in case"</p>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                Adds complexity. useCallback itself has a cost (storing the
                function + comparing deps). If no child uses memo, it's wasted.
              </p>
            </div>
          </div>
          <div>
            <div className="card" style={{ borderColor: "#2ecc71" }}>
              <p>
                <span className="tag tag-good">Do</span>
              </p>
              <p>
                Use it when passing callbacks to <code>memo()</code> children,
                or when the function is in a useEffect dependency array
              </p>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                These are the two cases where a stable reference actually
                matters.
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
              <p>
                Use useMemo for simple operations like <code>a + b</code> or
                string concatenation
              </p>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                The overhead of useMemo is more than the computation itself.
              </p>
            </div>
          </div>
          <div>
            <div className="card" style={{ borderColor: "#2ecc71" }}>
              <p>
                <span className="tag tag-good">Do</span>
              </p>
              <p>
                Use useMemo for expensive work: filtering/sorting large lists,
                complex calculations, creating derived data
              </p>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                If the computation takes more than ~1ms, useMemo can help.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-practical" style={{ marginTop: 24 }}>
        <h3>For your GP2 and Final Project</h3>
        <ul>
          <li>
            <strong>You do NOT need to add these everywhere.</strong> Most
            components re-render fast enough without optimization.
          </li>
          <li>
            If you have a search/filter component that feels laggy, try wrapping
            the child in <code>memo</code> and the callback in{" "}
            <code>useCallback</code>.
          </li>
          <li>
            If you have an expensive list filter, wrap it in{" "}
            <code>useMemo</code>.
          </li>
          <li>
            The React DevTools Profiler can show you which components re-render
            and how long they take.
          </li>
          <li>
            <strong>Rule of thumb:</strong> Write it without optimization first.
            If it's slow, then optimize.
          </li>
        </ul>
      </div>
    </div>
  );
}
